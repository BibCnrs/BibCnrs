pkill -f vite
pkill -f "node dist/main"

yarn install --immutable
source .env
set -a; source .env; set +a

docker compose --env-file .env -f docker-compose.test-e2e.yml up -d db
docker compose --env-file .env -f docker-compose.test-e2e.yml up -d redis
# docker compose --env-file .env -f docker-compose.test-e2e.yml up -d proxy


yarn workspace @bibcnrs/api prisma generate
yarn workspace @bibcnrs/e2e run playwright install
yarn workspace @bibcnrs/api run start:e2e &
# yarn workspace @bibcnrs/api run start:dev -d &
yarn workspace @bibcnrs/front run dev --port 5173 -d &
yarn workspace @bibcnrs/admin run dev --port 5174 -d & 

