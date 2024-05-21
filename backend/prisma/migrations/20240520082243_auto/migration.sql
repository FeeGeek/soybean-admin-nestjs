-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ENABLED', 'DISABLED', 'BANNED');

-- CreateTable
CREATE TABLE "sys_user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "built_in" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT,
    "email" TEXT,
    "phone_number" TEXT,
    "nike_name" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "sys_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casbin_rule" (
    "id" SERIAL NOT NULL,
    "ptype" TEXT NOT NULL,
    "v0" TEXT,
    "v1" TEXT,
    "v2" TEXT,
    "v3" TEXT,
    "v4" TEXT,
    "v5" TEXT,

    CONSTRAINT "casbin_rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_domain" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "sys_domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_role" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "pid" TEXT NOT NULL DEFAULT '0',
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "sys_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_user_role" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "sys_user_role_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "sys_endpoint" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "controller" TEXT NOT NULL,
    "summary" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "sys_endpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_organization" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "pid" TEXT NOT NULL DEFAULT '0',
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" TEXT,

    CONSTRAINT "sys_organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_login_log" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "login_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT NOT NULL,
    "port" INTEGER,
    "address" TEXT NOT NULL,
    "mouser_agentdule_name" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "sys_login_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_operation_log" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "module_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "user_agent" TEXT,
    "params" JSONB,
    "body" JSONB,
    "response" JSONB,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "sys_operation_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sys_user_username_key" ON "sys_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "sys_user_email_key" ON "sys_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sys_user_phone_number_key" ON "sys_user"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "sys_domain_code_key" ON "sys_domain"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys_role_code_key" ON "sys_role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sys_organization_code_key" ON "sys_organization"("code");