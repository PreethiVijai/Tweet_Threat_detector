#!/bin/sh

# Decrypt the file
mkdir $HOME/secrets
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output $HOME/secrets/key.json .secrets/idyllic-kit-269502-5dbfca1ec8fa.json.gpg
