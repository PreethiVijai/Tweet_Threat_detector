#!/bin/sh

# Decrypt the file
mkdir $HOME/secrets
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$secrets.ENCRYPT_KEY" \
--output $HOME/secrets/key.json secrets/idyllic-kit-269502-325031fc9cf7.json.gpg
