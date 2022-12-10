## [Dockerfile](https://docs.docker.com/engine/reference/builder/#format)

### Parser directives

Parser directives are optional, and affect the way in which subsequent lines in a Dockerfile
are handled.

The following parser directives are supported:
 - syntax
 - escape

###### escape

The escape directive sets the character used to escape characters in a Dockerfile.
If not specified, the default escape character is \.

```dockerfile
# This case will fail. Result of this dockerfile is that second and third lines are considered a 
# single instruction.

FROM microsoft/nanoserver
COPY testfile.txt c:\\
RUN dir c:\
```

```dockerfile
# escape=`

FROM microsoft/nanoserver
COPY testfile.txt c:\
RUN dir c:\
```

### .dockerignore file

Before the docker CLI sends the context to the docker daemon, it looks for a file named
`.dockerignore` in the root directory of the context. If this file exists, the CLI modifies the 
context to exclude files and directories that match patterns in it.

```dockerfile
# comment
*/temp*
*/*/temp*
temp?
```

### FROM

```dockerfile
FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
```

The `FROM` instruction initializes a new build stage and sets the Base Image for subsequent 
instructions. As such, a valid `Dockerfile` must start with a `FROM` instruction. The image can 
be any valid image – it is especially easy to start by pulling an image from the Public 
Repositories.

```dockerfile
ARG  CODE_VERSION=5.0
FROM base:${CODE_VERSION}
CMD  /code/run-app

FROM extras:${CODE_VERSION}
CMD  /code/run-extras
```

### RUN

RUN has 2 forms:
 - `RUN <command>` (shell form, the command is run in a shell, which by default is `/bin/sh -c` on 
Linux or `cmd /S /C` on Windows)
 - `RUN ["executable", "param1", "param2"]` (exec form)

The `RUN` instruction will execute any commands in a new layer on top of the current image and 
commit the results. The resulting committed image will be used for the next step in the 
`Dockerfile`.

Layering `RUN` instructions and generating commits conforms to the core concepts of Docker 
where commits are cheap and containers can be created from any point in an image’s history, 
much like source control.

The exec form makes it possible to avoid shell string munging, and to `RUN` commands using a base 
image that does not contain the specified shell executable.

The default shell for the shell form can be changed using the SHELL command.

```dockerfile
RUN /bin/bash -c 'source $HOME/.bashrc; \
  echo $HOME'
# Is eqivalent to:
RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
# To use a different shell, other than ‘/bin/sh’, use the exec form
# passing in the desired shell. For example:
RUN ["/bin/bash", "-c", "echo hello"]
```

### CMD

There can only be one `CMD` instruction in a `Dockerfile`. If you list more than one `CMD` then 
only the last `CMD` will take effect.

The main purpose of a `CMD` is to provide defaults for an executing container. These defaults 
can include an executable, or they can omit the executable, in which case you must specify an 
`ENTRYPOINT` instruction as well.

If `CMD` is used to provide default arguments for the `ENTRYPOINT` instruction, both the `CMD` 
and `ENTRYPOINT` instructions should be specified with the `JSON` array format.

### LABEL

The LABEL instruction adds metadata to an image. A LABEL is a key-value pair.

```dockerfile
LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"
LABEL version="1.0"
LABEL multi.label1="value1" \
      multi.label2="value2" \
      other="value3"
```

To view an image’s labels, use the `docker image inspect` command. You can use the 
`--format` option to show just the labels;

```shell
$ docker image inspect --format='' myimage
{
  "com.example.vendor": "ACME Incorporated",
  "com.example.label-with-value": "foo",
  "version": "1.0",
  "description": "This text illustrates that label-values can span multiple lines.",
  "multi.label1": "value1",
  "multi.label2": "value2",
  "other": "value3"
}
```

### EXPOSE

The `EXPOSE` instruction informs `Docker` that the container listens on the specified network 
ports at runtime. You can specify whether the port listens on `TCP` or `UDP`, and the default is 
`TCP` if the protocol is not specified.

The `EXPOSE` instruction does not actually publish the port. It functions as a type of 
documentation between the person who builds the image and the person who runs the container, 
about which ports are intended to be published. To actually publish the port when running the 
container, use the `-p` flag on `docker run` to publish and map one or more ports, or the `-P` 
flag to publish all exposed ports and map them to high-order ports.

```dockerfile
EXPOSE 80/tcp
EXPOSE 80/udp
```









