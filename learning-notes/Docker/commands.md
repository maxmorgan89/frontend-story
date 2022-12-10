## [Commands](https://docs.docker.com/engine/reference/run/)

### run

```shell
docker run \
  -d \
  -p 8080:80 \
  -v ${PWD}:/usr/share/nginx/html \
  --name my_nginx \
  --rm \
  nginx
```

### exec

Run a command in a running container.

```shell
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
docker exec -it container_name bash
```

## inspect

Return low-level information on Docker objects

```shell
docker inspect container_name
```
