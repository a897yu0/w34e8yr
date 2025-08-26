FROM node:22.18.0-alpine AS base

ARG APP

ARG USER
ARG USER_HOME

USER root

# Install necessary packages and tools
RUN apk update && apk add --no-cache \
    bash \
    sudo \
    shadow

RUN if [ ! -d "${USER_HOME}" ]; then \
        usermod --home ${USER_HOME} -m ${USER}; \
    fi

RUN sudo chown -R ${USER}:${USER} ${USER_HOME}

USER $USER


# ----------------------------------------------------------------------
FROM base AS dev

USER root

# Install necessary packages and tools
RUN sudo apk update && apk add --no-cache \
    curl zip \
    git \
    tree wget \
    nano

USER $USER


# ----------------------------------------------------------------------
FROM base AS pre-release

COPY . .

# ----------------------------------------------------------------------
FROM base AS release

# Copy only executable files from the pre-build stage
# COPY --from=pre-build 