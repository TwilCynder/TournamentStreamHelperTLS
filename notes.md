Si jamais je veux virer ust de l'historique carrément : 

```bash
rm -rf .git/modules/<path-to-submodule>
git config --remove-section submodule.<path-to-submodule>
```