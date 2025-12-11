# Makefile for Shop Ve Sinh Project
.PHONY: install dev build prd

# Sử dụng cmd.exe cho Windows
SHELL := cmd.exe

# Cài đặt dependencies
install:
	@echo "=== Installing Backend Dependencies ==="
	cd backend && uv sync
	@echo "=== Installing Frontend Dependencies ==="
	cd frontend && npm install

# Chạy Development (Cả Backend & Frontend)
dev:
	@echo "=== Starting Dev Environment ==="
	cd frontend && npx -y concurrently -k -n "API,WEB" -c "blue,green" "cd ../backend && uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000" "npm run dev"

# Build Frontend
build:
	@echo "=== Building Frontend ==="
	cd frontend && npm run build

#
