# Registry Board

Very basic app to view repositories pushed to a
[container registry](https://hub.docker.com/_/registry) or container registries
compatible with Docker Registry HTTP API V2.

To run this application, build the docker image and deploy the container in the
same network as the registry container:

```bash
docker build -t registry-board .
```

```bash
docker run -d --network my_network -p 3000:3000 registry-board
```

After that you can visit the url `0.0.0.0:3000` and add the registry url.
Assuming the name of the registry container is set to `registry` and running on
port `5000`, you can save it as:

```
registry:5000
```

If everything goes well, you should now be able to see a list of all
repositories in the registry :)

# Roadmap

1. Add pagination for repositories list
2. Display available tags of repositories
3. Accept registryUrl from env
