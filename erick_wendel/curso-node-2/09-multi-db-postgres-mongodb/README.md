docker run \
 --name postgres \
 -e POSTGRES_USER=admin \
 -e POSTGRES_PASSWORD=minhasenhasecreta \
 -e POSTGRES_DB=heroes \
 -p 5432:5432 \
 -d \
 postgres

docker run \
 --name adminer \
 -p 8080:8080 \
 --link postgres:postgres \
 -d \
 adminer

## --- MongoDB

docker run \
 --name mongodb \
 -p 27017:27017 \
 -e MONGO_INITDB_ROOT_USERNAME=admin \
 -e MONGO_INITDB_ROOT_PASSWORD=minhasenhasecreta \
 -d \
 mongo:4

docker run \
 --name mongoclient \
 -p 3000:3000 \
 --link mongodb:mongodb \
 -d \
 mongoclient/mongoclient

docker exec -it mongodb \
 mongo --host localhost -u admin -p minhasenhasecreta --authenticationDatabase admin \
 --eval "db.getSiblingDB('heroes').createUser({user: 'matheustorreao', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'heroes'}]})"

npm i sequelize pg-hstore pg

Acessar o mongodb via terminal do docker
docker exec -it mongodb \
 mongo --host localhost -u matheustorreao -p minhasenhasecreta --authenticationDatabase heroes

show dbs
use heroes
db.heroes.insert({ nome: 'Abc' })
db.heroes.find({nome}).pretty()
db.heroes.find({}).limit(100).sort({nome: -1})
db.heroes.find({}, {\_id: 0}) // para nao retornar o \_id

for(let i = 0; i < 100; i++){
db.heroes.insert({
nome: `Heroi-${i}`,
poder: 'Kamehameha'
})
}

db.heroes.update({\_id: ObjectId("1234")}, {\$set: {nome: "Novo nome"}})
