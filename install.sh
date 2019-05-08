#! bin/bash
#TODO: TESTEAR EL INSTALADOR

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
nvm install node
git clone https://github.com/StraightUpCode/TrabajoBaseDeDatos.git

cat *script SQL * | mysql -u root -p"Contraseña"

cd TrabajoBaseDeDatos
npm run start 