FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . .
WORKDIR .

FROM base
RUN cat docker.env>.env
RUN pnpm install
RUN pnpm run build
EXPOSE 8000
CMD [ "pnpm", "start:dev" ]