# Open Agent Platform - Auth-less Demo Setup

> ⚠️ **EXPERIMENTAL - FOR TESTING PURPOSES ONLY** ⚠️
> 
> This repository contains a modified version of the Open Agent Platform with **ALL AUTHENTICATION REMOVED** for testing and development purposes. This setup uses a single dummy user (`user1`) for all operations and should **NEVER be used in production**.

## Overview

This monorepo contains a complete, working setup of the Open Agent Platform with all authentication mechanisms disabled and configured to work together seamlessly in demo mode.

## 🏗️ Architecture

```
oap/
├── langconnect/              # RAG server for document indexing and search
├── oap-agent-supervisor/     # Multi-agent supervisor for coordinating agents  
├── oap-langgraph-tools-agent/# Tools agent with RAG integration
├── open-agent-platform/      # Main web interface and API
└── README.md                 # This file
```

## 🔧 Components

### 1. **langconnect** - RAG Server
- **Purpose**: Document indexing, search, and retrieval
- **Port**: `8080`
- **Auth**: Demo mode with hardcoded user credentials (`user1`, `user2`)
- **Modifications**: 
  - `IS_TESTING="true"` in `.env`
  - Accepts demo tokens for all operations

### 2. **open-agent-platform** - Web Interface
- **Purpose**: Main UI, API, and agent management
- **Port**: `3000`
- **Auth**: Completely disabled
- **Modifications**:
  - `NEXT_PUBLIC_DISABLE_AUTH="true"` in `.env.local`
  - RAG hook modified to use demo token (`user1`)
  - SelectItem components fixed for empty values

### 3. **oap-langgraph-tools-agent** - Tools Agent
- **Purpose**: Agent with tool capabilities and RAG integration
- **Port**: `2024`
- **Auth**: Uses demo token for RAG connections
- **Modifications**:
  - Hardcoded to use `user1` demo token for RAG operations
  - Bypasses Supabase authentication entirely

### 4. **oap-agent-supervisor** - Multi-Agent Supervisor  
- **Purpose**: Coordinates multiple agents and workflows
- **Port**: `2052`
- **Auth**: Uses demo token for child agent communication
- **Modifications**:
  - Falls back to `user1` demo token when no auth provided
  - Passes demo credentials to child agents

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL (for langconnect)
- Docker (optional)

### 1. Start the RAG Server (langconnect)
```bash
cd langconnect
# Install dependencies and start
uv sync
# Ensure PostgreSQL is running, then:
python -m langconnect
# Server will start on http://localhost:8080
```

### 2. Start the Tools Agent
```bash
cd oap-langgraph-tools-agent
# Install dependencies
uv sync
source .venv/bin/activate.
# Start the agent
langgraph dev --port 2024
# Agent will start on http://localhost:2024
```

### 3. Start the Supervisor Agent
```bash
cd oap-agent-supervisor
# Install dependencies  
uv sync
source .venv/bin/activate
# Start the supervisor
langgraph dev --port 2052
# Supervisor will start on http://localhost:2052
```

### 4. Start the Web Platform
```bash
cd open-agent-platform/apps/web
# Install dependencies
npm install
# Start the development server
npm run dev
# Platform will start on http://localhost:3000
```

## 🔐 Authentication Bypass Details

### Demo User Configuration
- **Primary Demo User**: `user1`
- **Secondary Demo User**: `user2` (langconnect only)
- **All services**: Configured to accept these hardcoded credentials

### Modified Components
1. **Web Platform RAG Hook**: Always uses `user1` for RAG operations
2. **Tools Agent**: Hardcoded demo token for all RAG connections  
3. **Supervisor Agent**: Falls back to demo credentials when no auth provided
4. **langconnect**: Demo mode accepts `user1`/`user2` tokens

### Security Implications
- 🚨 **No user isolation**: All users see all data
- 🚨 **No access control**: Any operation is permitted
- 🚨 **No data protection**: Sensitive information is not secured
- 🚨 **Network exposure**: Services accept any connection

## 📝 Usage

1. **Access the Web Interface**: Navigate to `http://localhost:3000`
2. **Create Agents**: Use the agent creation interface (auth bypass is automatic)
3. **Configure RAG**: Add documents to collections (uses demo credentials)
4. **Test Multi-Agent Workflows**: Create supervisor agents with multiple child agents
5. **Interact with Agents**: Chat interface works without any authentication

## 🛠️ Key Modifications Made

### Fixed Issues
- **RAG Server Initialization**: Removed non-existent `/admin/initialize-database` endpoint dependency
- **SelectItem Empty Values**: Fixed React Select components throwing errors on empty values
- **Authentication Flow**: Bypassed all authentication checks across all services
- **Token Passing**: Ensured demo tokens are passed between all services

### Environment Variables
```bash
# langconnect/.env
IS_TESTING="true"

# open-agent-platform/apps/web/.env.local  
NEXT_PUBLIC_DISABLE_AUTH="true"
NEXT_PUBLIC_RAG_API_URL="http://localhost:8080"
```

## ⚠️ Important Warnings

- **DO NOT USE IN PRODUCTION**: This setup has no security whatsoever
- **NO DATA PRIVACY**: All users share the same data space
- **NO AUTHENTICATION**: Anyone can access and modify anything
- **EXPERIMENTAL ONLY**: This is for testing and development purposes only
- **NOT SCALABLE**: Hardcoded credentials and bypassed security measures

## 🐛 Known Issues

- MCP connection errors (external service connectivity issues - non-critical)
- No user session management
- All operations execute as the same demo user
- No audit logging or access tracking

## 📚 Original Repositories

This monorepo combines code from these original open-source projects:
- [langconnect](https://github.com/langchain-ai/langconnect)
- [open-agent-platform](https://github.com/langchain-ai/open-agent-platform)
- [oap-tools-agent](https://github.com/langchain-ai/oap-langgraph-tools-agent)
- [oap-supervisor](https://github.com/langchain-ai/oap-agent-supervisor)
