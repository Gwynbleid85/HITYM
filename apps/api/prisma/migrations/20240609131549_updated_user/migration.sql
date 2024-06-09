-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastActive" TIMESTAMP(3),
ADD COLUMN     "lastLatitude" DOUBLE PRECISION,
ADD COLUMN     "lastLongitude" DOUBLE PRECISION;
