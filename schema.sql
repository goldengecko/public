-- Schema for use with supabase in association with supabase default auth schema.

-- Migration 1: Create enum types
CREATE TYPE painting_style AS ENUM ('Realist', 'Impressionist', 'Abstract', 'Expressionist', 'Surrealist', 'Romantic', 'Minimalist');
CREATE TYPE brush_style AS ENUM ('Detailed', 'Expressive', 'Palette Knife');
CREATE TYPE commission_type AS ENUM ('Duplicate', 'Variation', 'Custom');
-- Migration 2: Create pictures table
CREATE TABLE pictures (
  id BIGSERIAL PRIMARY KEY,
  identifier TEXT NOT NULL,
  generation INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  main_image_path TEXT NOT NULL,
  pixel_width INT NOT NULL,
  pixel_height INT NOT NULL,
  supporting_images JSONB NOT NULL DEFAULT '[]',
  artist_statement TEXT,
  actual_width INT NOT NULL,
  actual_height INT NOT NULL,
  painting_styles painting_style[] NOT NULL,
  brush_styles brush_style[] NOT NULL,
  painted_date TIMESTAMP NOT NULL,
  available BOOLEAN NOT NULL DEFAULT false,
  framed BOOLEAN NOT NULL,
  color_data BYTEA NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  commissionable BOOLEAN NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  CONSTRAINT unique_identifier_generation UNIQUE (identifier, generation)
);

CREATE INDEX idx_pictures_identifier ON pictures (identifier);
CREATE INDEX idx_pictures_available ON pictures (available);
-- Migration 3: Create providers table
CREATE TABLE providers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  description TEXT,
  notes TEXT,
  supported_countries TEXT[] NOT NULL,
  production_time INT NOT NULL, -- in business days
  supported_media BIGINT[] -- References print_media(id)
);
-- Migration 4: Create print_media table
CREATE TABLE print_media (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);
-- Migration 5: Create picture_sizes table
CREATE TABLE picture_sizes (
  id BIGSERIAL PRIMARY KEY,
  width INT NOT NULL,
  height INT NOT NULL,
  aspect_ratio DECIMAL(10, 6) NOT NULL
);
-- Migration 6: Create prints table
CREATE TABLE prints (
  id BIGSERIAL PRIMARY KEY,
  picture_id BIGINT NOT NULL REFERENCES pictures(id),
  provider_id BIGINT NOT NULL REFERENCES providers(id),
  image_path TEXT NOT NULL,
  suggested_medium_id BIGINT REFERENCES print_media(id),
  CONSTRAINT unique_picture_provider UNIQUE (picture_id, provider_id)
);
-- Migration 7: Create print_options table
CREATE TABLE print_options (
  id BIGSERIAL PRIMARY KEY,
  print_id BIGINT NOT NULL REFERENCES prints(id),
  size_id BIGINT NOT NULL REFERENCES picture_sizes(id),
  medium_id BIGINT NOT NULL REFERENCES print_media(id),
  provider_id BIGINT NOT NULL REFERENCES providers(id),
  price DECIMAL(10, 2) NOT NULL,
  CONSTRAINT unique_print_size_medium_provider UNIQUE (print_id, size_id, medium_id, provider_id)
);
-- Migration 8: Create other_products table
CREATE TABLE other_products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);
-- Migration 9: Create picture_products table
CREATE TABLE picture_products (
  id BIGSERIAL PRIMARY KEY,
  picture_id BIGINT NOT NULL REFERENCES pictures(id),
  product_id BIGINT NOT NULL REFERENCES other_products(id),
  image_path TEXT NOT NULL,
  CONSTRAINT unique_picture_product UNIQUE (picture_id, product_id)
);
-- Migration 10: Create galleries table
CREATE TABLE galleries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  commission_rate DECIMAL(5, 2) NOT NULL,
  notes TEXT
);
-- Migration 11: Create gallery_contacts table
CREATE TABLE gallery_contacts (
  id BIGSERIAL PRIMARY KEY,
  gallery_id BIGINT NOT NULL REFERENCES galleries(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  notes TEXT
);
-- Migration 12: Create picture_gallery_displays table
CREATE TABLE picture_gallery_displays (
  id BIGSERIAL PRIMARY KEY,
  picture_id BIGINT NOT NULL REFERENCES pictures(id),
  gallery_id BIGINT NOT NULL REFERENCES galleries(id),
  contact_id BIGINT REFERENCES gallery_contacts(id),
  display_start TIMESTAMP NOT NULL,
  display_end TIMESTAMP,
  shipped_date TIMESTAMP,
  returned_date TIMESTAMP,
  notes TEXT
);
-- Migration 13: Create discounts table
CREATE TABLE discounts (
  id BIGSERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  percentage DECIMAL(5, 2) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  applies_to TEXT NOT NULL, -- 'all', 'original', 'product_type', 'specific_picture'
  product_type TEXT, -- NULL if not applicable
  picture_id BIGINT REFERENCES pictures(id), -- NULL if not applicable
  single_use BOOLEAN NOT NULL DEFAULT false,
  used BOOLEAN NOT NULL DEFAULT false,
  auto_apply BOOLEAN NOT NULL DEFAULT false
);
-- Migration 14: Create orders table
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  shipping_cost DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) NOT NULL,
  affiliate_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL,
  paid BOOLEAN NOT NULL DEFAULT false,
  billing_address JSONB NOT NULL,
  shipping_address JSONB NOT NULL,
  carrier TEXT,
  tracking_number TEXT,
  delivery_instructions TEXT,
  discount_code TEXT REFERENCES discounts(code)
);
-- Migration 16: Create commission_sizes table
CREATE TABLE commission_sizes (
  id BIGSERIAL PRIMARY KEY,
  picture_id BIGINT NOT NULL REFERENCES pictures(id),
  size_id BIGINT NOT NULL REFERENCES picture_sizes(id),
  price DECIMAL(10, 2) NOT NULL
);
-- Migration 17: Create commission_settings table
CREATE TABLE commission_settings (
  id BIGSERIAL PRIMARY KEY,
  commission_type commission_type NOT NULL,
  initial_charge_percentage DECIMAL(5, 2) NOT NULL
);
-- Migration 18: Create style_price_multipliers table
CREATE TABLE style_price_multipliers (
  id BIGSERIAL PRIMARY KEY,
  style_type TEXT NOT NULL, -- 'painting' or 'brush'
  style TEXT NOT NULL,
  multiplier DECIMAL(5, 2) NOT NULL
);
-- Migration 19: Create commission_requests table
CREATE TABLE commission_requests (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  commission_type commission_type NOT NULL,
  base_picture_id BIGINT REFERENCES pictures(id),
  width INT NOT NULL,
  height INT NOT NULL,
  painting_style painting_style,
  brush_style brush_style,
  color1 CHAR(7),
  color2 CHAR(7),
  color3 CHAR(7),
  description TEXT,
  reference_image_path TEXT,
  decor_image_path TEXT,
  price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL
);
-- Migration 15: Create order_items table
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  item_type TEXT NOT NULL, -- 'original', 'print', 'other_product', 'commission'
  picture_id BIGINT REFERENCES pictures(id),
  print_option_id BIGINT REFERENCES print_options(id),
  product_id BIGINT REFERENCES other_products(id),
  commission_id BIGINT REFERENCES commission_requests(id),
  quantity INT NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  discounted_price DECIMAL(10, 2) NOT NULL
);
-- Migration 20: Create multiple_item_discounts table
CREATE TABLE multiple_item_discounts (
  id BIGSERIAL PRIMARY KEY,
  product_type TEXT NOT NULL, -- 'print', 'other_product', 'commission'
  quantity INT NOT NULL,
  discount_percentage DECIMAL(5, 2) NOT NULL
);
-- Migration 21: Create gallery_sales table
CREATE TABLE gallery_sales (
  id BIGSERIAL PRIMARY KEY,
  picture_id BIGINT NOT NULL REFERENCES pictures(id),
  gallery_id BIGINT NOT NULL REFERENCES galleries(id),
  contact_id BIGINT REFERENCES gallery_contacts(id),
  sale_date TIMESTAMP NOT NULL,
  customer_price DECIMAL(10, 2) NOT NULL,
  gallery_commission DECIMAL(10, 2) NOT NULL,
  other_fees DECIMAL(10, 2) NOT NULL DEFAULT 0,
  net_income DECIMAL(10, 2) NOT NULL
);
-- Migration 22: Create system_settings table
CREATE TABLE system_settings (
  id BIGSERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL
);

-- Insert initial system setting for commission wait time
INSERT INTO system_settings (key, value) VALUES ('commission_wait_time', 'approximately 2-3 months');
-- Migration 23: Create affiliate_balances table
CREATE TABLE affiliate_balances (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  balance DECIMAL(10, 2) NOT NULL DEFAULT 0
);
-- Migration 24: Create communications table
CREATE TABLE communications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  admin_id UUID REFERENCES auth.users(id),
  order_id BIGINT REFERENCES orders(id),
  commission_id BIGINT REFERENCES commission_requests(id),
  thread_id BIGINT REFERENCES communications(id),
  message TEXT NOT NULL,
  sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP,
  deleted_at TIMESTAMP
);
-- Migration 25: Create payment_records table
CREATE TABLE payment_records (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  payment_method TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- Migration 26: Create shipping_costs table
CREATE TABLE shipping_costs (
  id BIGSERIAL PRIMARY KEY,
  country TEXT NOT NULL,
  state TEXT,
  provider_id BIGINT REFERENCES providers(id),
  product_type TEXT NOT NULL,
  size_id BIGINT REFERENCES picture_sizes(id),
  min_area INT,
  max_area INT,
  cost DECIMAL(10, 2) NOT NULL,
  shipping_time INT NOT NULL
);
-- Migration 27: Create customer_reviews table
CREATE TABLE customer_reviews (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  product_type TEXT NOT NULL, -- 'original', 'print', 'other_product'
  product_id BIGINT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, product_type, product_id)
);
-- Migration 28: Create indexes for performance
CREATE INDEX idx_communications_user ON communications(user_id);
CREATE INDEX idx_communications_order ON communications(order_id);
CREATE INDEX idx_communications_commission ON communications(commission_id);
CREATE INDEX idx_payment_records_order ON payment_records(order_id);
CREATE INDEX idx_shipping_costs_country_state ON shipping_costs(country, state);
CREATE INDEX idx_customer_reviews_product ON customer_reviews (product_type, product_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_commission_requests_user ON commission_requests(user_id);
CREATE INDEX idx_pictures_available_commissionable ON pictures(available, commissionable);
-- Migration 29: Create view for average product ratings
CREATE VIEW product_ratings AS
SELECT 
  product_type,
  product_id,
  AVG(rating) as average_rating,
  COUNT(*) as review_count
FROM customer_reviews
GROUP BY product_type, product_id;
-- Migration 30: Enable Row Level Security (RLS) on all tables
ALTER TABLE pictures ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE print_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE picture_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE prints ENABLE ROW LEVEL SECURITY;
ALTER TABLE print_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE other_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE picture_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE picture_gallery_displays ENABLE ROW LEVEL SECURITY;
ALTER TABLE discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE style_price_multipliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE multiple_item_discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
-- Migration 31: Create function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = user_id AND metadata->>'is_admin' = 'true'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Migration 32: Create RLS policies
-- Pictures table
CREATE POLICY "Public read access for available pictures" ON pictures
  FOR SELECT USING (available = true);

CREATE POLICY "Admin full access" ON pictures
  USING (is_admin(auth.uid()));

-- Orders table
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin full access" ON orders
  USING (is_admin(auth.uid()));

-- Communications table
CREATE POLICY "Users can view their own communications" ON communications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all communications" ON communications
  USING (is_admin(auth.uid()));

CREATE POLICY "Users can insert their own communications" ON communications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

  -- Continuation of Migration 32: Create RLS policies

-- Communications table (continued)
CREATE POLICY "Admins can insert communications" ON communications
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Users can update their own communications" ON communications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all communications" ON communications
  FOR UPDATE USING (is_admin(auth.uid()));

-- Payment records table
CREATE POLICY "Users can view their own payment records" ON payment_records
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM orders WHERE id = payment_records.order_id));

CREATE POLICY "Admins can view all payment records" ON payment_records
  USING (is_admin(auth.uid()));

-- Shipping costs table
CREATE POLICY "Public read access for shipping costs" ON shipping_costs
  FOR SELECT USING (true);

CREATE POLICY "Admin full access" ON shipping_costs
  USING (is_admin(auth.uid()));

-- Customer reviews table
CREATE POLICY "Public read access for customer reviews" ON customer_reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON customer_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON customer_reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Commission requests table
CREATE POLICY "Users can view their own commission requests" ON commission_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all commission requests" ON commission_requests
  USING (is_admin(auth.uid()));

CREATE POLICY "Users can insert their own commission requests" ON commission_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Migration 33: Create functions and triggers
CREATE OR REPLACE FUNCTION update_order_paid_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE orders
  SET paid = (
    SELECT COALESCE(SUM(amount), 0) >= (total_amount + shipping_cost + tax_amount)
    FROM payment_records
    WHERE order_id = NEW.order_id
  )
  WHERE id = NEW.order_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_payment_record_insert_or_update
AFTER INSERT OR UPDATE ON payment_records
FOR EACH ROW
EXECUTE FUNCTION update_order_paid_status();

CREATE OR REPLACE FUNCTION check_picture_styles()
RETURNS TRIGGER AS $$
BEGIN
  IF array_length(NEW.painting_styles, 1) < 1 THEN
    RAISE EXCEPTION 'At least one painting style is required';
  END IF;
  IF array_length(NEW.brush_styles, 1) < 1 THEN
    RAISE EXCEPTION 'At least one brush style is required';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_picture_insert_or_update
BEFORE INSERT OR UPDATE ON pictures
FOR EACH ROW
EXECUTE FUNCTION check_picture_styles();

-- Drop the existing function and trigger
DROP TRIGGER IF EXISTS after_order_insert ON orders;
DROP FUNCTION IF EXISTS update_affiliate_balance();

-- Create a new function to update affiliate balance
CREATE OR REPLACE FUNCTION update_affiliate_balance()
RETURNS TRIGGER AS $$
DECLARE
    affiliate_commission DECIMAL(10, 2);
    is_fully_paid BOOLEAN;
BEGIN
    -- Check if the order is fully paid
    SELECT (COALESCE(SUM(amount), 0) >= (total_amount + shipping_cost + tax_amount)) INTO is_fully_paid
    FROM payment_records
    WHERE order_id = NEW.id;

    -- Calculate the affiliate commission (assume 10%, adjust as needed)
    affiliate_commission := NEW.total_amount * 0.1;

    IF NEW.affiliate_id IS NOT NULL THEN
        IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.paid = false AND NEW.paid = true) THEN
            -- Add commission to affiliate balance when order becomes fully paid
            IF is_fully_paid THEN
                INSERT INTO affiliate_balances (user_id, balance)
                VALUES (NEW.affiliate_id, affiliate_commission)
                ON CONFLICT (user_id) DO UPDATE
                SET balance = affiliate_balances.balance + affiliate_commission;
            END IF;
        ELSIF TG_OP = 'UPDATE' AND OLD.paid = true AND NEW.paid = false THEN
            -- Remove commission from affiliate balance when order is no longer fully paid
            UPDATE affiliate_balances
            SET balance = balance - affiliate_commission
            WHERE user_id = NEW.affiliate_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a new trigger that fires on INSERT or UPDATE of orders
CREATE TRIGGER after_order_insert_or_update
AFTER INSERT OR UPDATE OF paid ON orders
FOR EACH ROW
EXECUTE FUNCTION update_affiliate_balance();

-- Create a function to handle refunds and update affiliate balance
CREATE OR REPLACE FUNCTION handle_refund()
RETURNS TRIGGER AS $$
DECLARE
    order_total DECIMAL(10, 2);
    total_paid DECIMAL(10, 2);
    affiliate_id UUID;
    affiliate_commission DECIMAL(10, 2);
BEGIN
    -- Get order total and affiliate_id
    SELECT total_amount + shipping_cost + tax_amount, orders.affiliate_id 
    INTO order_total, affiliate_id
    FROM orders
    WHERE id = NEW.order_id;

    -- Calculate total paid after refund
    SELECT COALESCE(SUM(amount), 0) INTO total_paid
    FROM payment_records
    WHERE order_id = NEW.order_id;

    -- If order is no longer fully paid and has an affiliate, update affiliate balance
    IF total_paid < order_total AND affiliate_id IS NOT NULL THEN
        -- Calculate the affiliate commission (assume 10%, adjust as needed)
        affiliate_commission := order_total * 0.1;

        -- Remove commission from affiliate balance
        UPDATE affiliate_balances
        SET balance = balance - affiliate_commission
        WHERE user_id = affiliate_id;

        -- Update order paid status
        UPDATE orders
        SET paid = false
        WHERE id = NEW.order_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger for handling refunds
CREATE TRIGGER after_payment_record_insert_or_update_2
AFTER INSERT OR UPDATE ON payment_records
FOR EACH ROW
WHEN (NEW.amount < 0)  -- This condition checks for refunds (negative amounts)
EXECUTE FUNCTION handle_refund();