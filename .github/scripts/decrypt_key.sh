#!/bin/sh

# Decrypt the file
mkdir $HOME/secrets
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --batch --yes --decrypt --passphrase="password" \
--output $HOME/secrets/key.json .secrets/test.txt.gpg #.secrets/idyllic-kit-269502-325031fc9cf7.json.gpg
