local obs         = obslua
local source_name = ""

local hotkeys_id = {
    save = obs.OBS_INVALID_HOTKEY_ID,
    clear = obs.OBS_INVALID_HOTKEY_ID,
    save_clear = obs.OBS_INVALID_HOTKEY_ID
}

local match_playlist = {}

local function add_to_match_playlist(path)
	match_playlist[#match_playlist+1] = path
end

local function clear_match_playlist()
	match_playlist = {}
end

local function load_match_playlist()
	local source = obs.obs_get_source_by_name(source_name)
	if source ~= nil then
		local settings = obs.obs_data_create()
		local playlist = obs.obs_data_array_create()

		for k, v in ipairs(match_playlist) do
			local item = obs.obs_data_create()
			obs.obs_data_set_string(item, "value", v)
			obs.obs_data_array_push_back(playlist, item)
		end

		obs.obs_data_set_array(settings, "playlist", playlist)
--		obs.obs_data_set_bool(settings, "loop", false)
--		obs.obs_data_set_bool(settings, "shuffle", false)
--		obs.obs_data_set_string(settings, "playback_behavior", stop_restart)
		obs.obs_source_update(source, settings)
		obs.obs_data_array_release(playlist)
		obs.obs_data_release(settings)
		obs.obs_source_release(source)
	end
end

local function clear_playlist()
	local source = obs.obs_get_source_by_name(source_name)
	if source ~= nil then
		local settings = obs.obs_data_create()
		local playlist = obs.obs_data_array_create()
		obs.obs_data_set_array(settings, "playlist", playlist)
--		obs.obs_data_set_bool(settings, "loop", false)
--		obs.obs_data_set_bool(settings, "shuffle", false)
--		obs.obs_data_set_string(settings, "playback_behavior", stop_restart)
		obs.obs_source_update(source, settings)
		obs.obs_data_array_release(playlist)
		obs.obs_data_release(settings)
		obs.obs_source_release(source)
	end
end

local function add_to_playlist(path)
	local source = obs.obs_get_source_by_name(source_name)
	if source ~= nil then
		local settings = obs.obs_source_get_settings(source)
		local playlist = obs.obs_data_get_array(settings, "playlist")
		local item = obs.obs_data_create()
		obs.obs_data_set_string(item, "value", path)
		obs.obs_data_array_push_back(playlist, item)
		obs.obs_data_set_array(settings, "playlist", playlist)

		--obs.obs_data_set_bool(settings, "loop", false)
		--obs.obs_data_set_bool(settings, "shuffle", false)
		--obs.obs_data_set_string(settings, "playback_behavior", stop_restart)

		obs.obs_source_update(source, settings)
		obs.script_log(obs.LOG_INFO, "In the try_add to path to source. About to release!")
		obs.obs_data_release(item)
		obs.obs_data_array_release(playlist)
		obs.obs_data_release(settings)
		obs.obs_source_release(source)
	end
end

local function remove_last_replay()
	local source = obs.obs_get_source_by_name(source_name)
	if source ~= nil then
		local settings = obs.obs_source_get_settings(source)
		local playlist = obs.obs_data_get_array(settings, "playlist")

		local size = obs.obs_data_array_count(playlist)
		if size > 0 then
			obs.obs_data_array_erase(playlist, size - 1)
		end

		obs.obs_data_set_array(settings, "playlist", playlist)

		--obs.obs_data_set_bool(settings, "loop", false)
		--obs.obs_data_set_bool(settings, "shuffle", false)
		--obs.obs_data_set_string(settings, "playback_behavior", stop_restart)

		obs.obs_source_update(source, settings)
		obs.script_log(obs.LOG_INFO, "In the try_add to path to source. About to release!")
		obs.obs_data_array_release(playlist)
		obs.obs_data_release(settings)
		obs.obs_source_release(source)
	end
end

local function instant_play(path)
	local source = obs.obs_get_source_by_name(source_name)
	if source ~= nil then
		local settings = obs.obs_data_create()
		local source_id = obs.obs_source_get_id(source)

		local array = obs.obs_data_array_create()
		local item = obs.obs_data_create()
		obs.obs_data_set_string(item, "value", path)
		obs.obs_data_array_push_back(array, item)
		obs.obs_data_set_array(settings, "playlist", array)

		-- updating will automatically cause the source to
		-- refresh if the source is currently active
		obs.obs_source_update(source, settings)
		obs.obs_data_release(item)
		obs.obs_data_array_release(array)
		obs.obs_data_release(settings)
		obs.obs_source_release(source)
	end
end

local function get_last_replay_path()
	local replay_buffer = obs.obs_frontend_get_replay_buffer_output()
	if replay_buffer == nil then
		return false
	end

	-- Call the procedure of the replay buffer named "get_last_replay" to
	-- get the last replay created by the replay buffer
	local cd = obs.calldata_create()
	local ph = obs.obs_output_get_proc_handler(replay_buffer)
	obs.proc_handler_call(ph, "get_last_replay", cd)
	local path = obs.calldata_string(cd, "path")
	obs.calldata_destroy(cd)

	obs.obs_output_release(replay_buffer)

	return path
end

local last_replay_path = ""
local attempts = 0
local function try_obtain_replay_callback(callback)
	--get the path of the last replay
	local path = get_last_replay_path()
	if path == false then --it's false if we simply couldn't access the replay buffer
		obs.remove_current_callback()
		return
	end

	if path == last_replay_path then
		path = nil
	end

	if not path then
		attempts = attempts + 1
		if attempts >= 10 then
			obs.remove_current_callback()
		end
	else
		last_replay_path = path

		callback(path)
		add_to_match_playlist(path)

		obs.remove_current_callback()
	end
end
local function try_instant_replay()
	try_obtain_replay_callback(instant_play)
end
local function try_add_to_playlist()
	try_obtain_replay_callback(add_to_playlist)
end

local function start_timer(callback)
	attempts = 0
	obs.timer_add(callback, 2000)
end

--the callback is executed after the path of the saved replay has been obtained
local function save(callback)
    local replay_buffer = obs.obs_frontend_get_replay_buffer_output()
	if replay_buffer ~= nil then
		-- Call the procedure of the replay buffer named "get_last_replay" to
		-- get the last replay created by the replay buffer
		local ph = obs.obs_output_get_proc_handler(replay_buffer)
		obs.proc_handler_call(ph, "save", nil)

		-- Set a 2-second timer to attempt playback every 1 second
		-- until the replay is available
		if obs.obs_output_active(replay_buffer) then
			start_timer(callback)
		else
			obs.script_log(obs.LOG_WARNING, "Tried to save an instant replay, but the replay buffer is not active!")
		end

		obs.obs_output_release(replay_buffer)
	else
		obs.script_log(obs.LOG_WARNING, "Tried to save an instant replay, but found no active replay buffer!")
	end
end

local function save_add_to_playlist()
    save(try_add_to_playlist)
end

local function save_instant_replay()
    save(try_instant_replay)
end

local hotkeys = {
    save = {
        name = "save",
        description = "Save replay to current playlist",
        func = save_add_to_playlist
    },
    clear = {
        name = "clear",
        description = "Clear replay playlist";
        func = clear_playlist
    },
    save_clear = {
        name = "save_clear",
        description = "Save replay to new playlist",
        func = save_instant_replay
    },
	remove_last = {
		name = "remove_last",
		description = "Remove last replay",
		func = remove_last_replay
	},
	clear_match_playlist = {
        name = "clear_match_playlist",
        description = "Clear Match Playlist",
        func = clear_match_playlist
    },
	load_match_playlist = {
        name = "load_match_playlist",
        description = "Load Match Playlist",
        func = load_match_playlist
    },
}


-- A function named script_description returns the description shown to
-- the user
function script_description()
	return "Too complicated to be described. Made by TwilCynder."
end

-- A function named script_properties defines the properties that the user
-- can change for the entire script module itself
function script_properties()
	props = obs.obs_properties_create() 

	local p = obs.obs_properties_add_list(props, "source", "VLC Source", obs.OBS_COMBO_TYPE_EDITABLE, obs.OBS_COMBO_FORMAT_STRING)
	local sources = obs.obs_enum_sources()
	if sources ~= nil then
		for _, source in ipairs(sources) do
			local source_id = obs.obs_source_get_id(source)
			if source_id == "vlc_source" then
				local name = obs.obs_source_get_name(source)
				obs.obs_property_list_add_string(p, name, name)
			else
				-- obs.script_log(obs.LOG_INFO, source_id)
			end
		end
	end
	obs.source_list_release(sources)

	return props
end

-- A function named script_load will be called on startup
function script_load(settings)
    for k, v in pairs(hotkeys) do
        local name = "replay_playlist."..v.name
        hotkeys_id[k] = obs.obs_hotkey_register_frontend(name, v.description, function(pressed)
			if not pressed then
				return
			end 
			v.func()
		end)
        local hotkey_save_array = obs.obs_data_get_array(settings, name)
        obs.obs_hotkey_load(hotkeys_id[k], hotkey_save_array)
        obs.obs_data_array_release(hotkey_save_array)
    end
end

function script_save(settings)
    for k, v in pairs(hotkeys) do
        local hotkey_save_array = obs.obs_hotkey_save(hotkeys_id[k])
        obs.obs_data_set_array(settings, "replay_playlist."..v.name, hotkey_save_array)
        obs.obs_data_array_release(hotkey_save_array)
    end
end

-- A function named script_update will be called when settings are changed
function script_update(settings)
	source_name = obs.obs_data_get_string(settings, "source")
end
