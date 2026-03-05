-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amountPaid" DECIMAL(10,2) NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentExpirationDate" TIMESTAMP(3) NOT NULL,
    "paymentRef" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" SERIAL NOT NULL,
    "testNumber" INTEGER NOT NULL,
    "startTestNumber" INTEGER NOT NULL,
    "stopTestNumber" INTEGER NOT NULL,
    "signStartTestN" INTEGER NOT NULL,
    "signStopTestN" INTEGER NOT NULL,
    "questions" TEXT NOT NULL,
    "marks" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeywordResult" (
    "id" SERIAL NOT NULL,
    "testNumber" INTEGER NOT NULL,
    "startTestNumber" INTEGER NOT NULL,
    "stopTestNumber" INTEGER NOT NULL,
    "signStartTestN" INTEGER NOT NULL,
    "signStopTestN" INTEGER NOT NULL,
    "questions" TEXT NOT NULL,
    "marks" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "KeywordResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentRef_key" ON "Payment"("paymentRef");

-- CreateIndex
CREATE UNIQUE INDEX "TestResult_userId_testNumber_key" ON "TestResult"("userId", "testNumber");

-- CreateIndex
CREATE UNIQUE INDEX "KeywordResult_userId_testNumber_key" ON "KeywordResult"("userId", "testNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordResult" ADD CONSTRAINT "KeywordResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
