def translateForUST(state):
    USTState = {}

    try: USTState['p1Name'] = state['score']['team']["1"]['player']["1"]['name']
    except: USTState['p1Name'] = ""
    
    try: USTState['p1Pron'] = state['score']['team']["1"]['player']["1"]['pronoun']
    except: USTState['p1Pron'] = ""

    try: USTState['p1Team'] = state['score']['team']["1"]['player']["1"]['team']
    except: USTState['p1Team'] = ""
    
    try: USTState['p1NScore'] = state['score']['team']["1"]['score']["1"]
    except: USTState['p1NScore'] = "0"
    
    try: USTState['p1Character'] = state['score']['team']["1"]['player']["1"]['character'][1]['name']
    except: USTState['p1Char'] = "Random"
    
    try: USTState['p1Skin'] = USTState['p1Character'] + ' (' + str(int(state['score']['team']["1"]['player']["1"]['character'][1]['skin']) + 1) + ')'
    except: USTState['p1Skin'] = "Random (1)"

    try: USTState['p2Name'] = state['score']['team']["2"]['player']["1"]['name']
    except: USTState['p2Name'] = ""
    
    try: USTState['p2Pron'] = state['score']['team']["2"]['player']["1"]['pronoun']
    except: USTState['p2Pron'] = ""

    try: USTState['p2Team'] = state['score']['team']["2"]['player']["1"]['team']
    except: USTState['p2Team'] = ""
    
    try: USTState['p2NScore'] = state['score']['team']["2"]['score']["1"]
    except: USTState['p2NScore'] = "0"
    
    try: USTState['p2Character'] = state['score']['team']["2"]['player']["1"]['character'][1]['name']
    except: USTState['p2Char'] = "Random"

    try: USTState['p2Skin'] = USTState['p2Character'] + ' (' + str(int(state['score']['team']["2"]['player']["1"]['character'][1]['skin']) + 1) + ')'
    except: USTState['p2Skin'] = "Random (1)"

    try:
        p1Losers = state['score']['team']["1"]['losers']
        p2Losers = state['score']['team']["2"]['losers']

        if not p1Losers and not p2Losers:
            USTState['p1WL'] = "Nada"
            USTState['p2WL'] = "Nada"
        else:
            USTState['p1WL'] = p1Losers and 'L' or 'W'
            USTState['p2WL'] = p2Losers and 'L' or 'W'

    except: 
        USTState['p1WL'] = "Nada"
        USTState['p2WL'] = "Nada"

    try: USTState['tournamentName'] = state['tournamentInfo']['tournamentName']
    except: USTState['tournamentName'] = ""

    try: USTState['caster1Name'] = state['commentary']['1']['mergedName']
    except: USTState['caster1Name'] = ""

    try: USTState['caster1Twitter'] = state['commentary']['1']['twitter']
    except: USTState['caster1Twitter'] = ""

    try: USTState['caster2Name'] = state['commentary']['2']['mergedName']
    except: USTState['caster2Name'] = ""

    try: USTState['caster2Twitter'] = state['commentary']['2']['twitter']
    except: USTState['caster2Twitter'] = ""

    try: USTState['round'] = state['score']['match']
    except: USTState['round'] = ""

    try: USTState['round'] = state['score']['match']
    except: USTState['round'] = ""

    USTState['bestOf'] = "Bo3"

    try: USTState['format'] = state['score']['best_of']
    except: USTState['format'] = ""

    USTState['caster1Twitch'] = ""
    USTState['caster2Twitch'] = ""

    USTState['p1Color'] = 'Red'
    USTState['p2Color'] = 'Blue'

    USTState['allowIntro'] = False  

    return USTState