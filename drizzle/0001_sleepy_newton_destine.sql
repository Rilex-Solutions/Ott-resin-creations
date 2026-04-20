CREATE TABLE "site_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"spring_sale_active" boolean DEFAULT false NOT NULL,
	"sale_percentage" numeric(5, 2) DEFAULT '50.00' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "product_type" varchar(50) DEFAULT 'resin' NOT NULL;