# TicketPlus

Comandos básicos:

cp .env.example .env -> geral

cp frontend/.env.example frontend/.env

cp backend/.env.example backend/.env

cd frontend && npm install && cd ..

cd backend && npm install && cd ..

docker compose up  ou  docker-compose up -d   

docker exec -it ticketplus_backend npx prisma migrate dev

docker exec -it ticketplus_backend npx prisma db seed

