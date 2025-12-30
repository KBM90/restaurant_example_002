# Supabase Database Setup for Addis Café

## Instructions

To complete the reservation system setup, you need to create a table in your Supabase database.

### Step 1: Access Supabase Dashboard

1. Go to [https://fgpdpafbshjmhttifpca.supabase.co](https://fgpdpafbshjmhttifpca.supabase.co)
2. Log in to your Supabase account
3. Navigate to the **SQL Editor** (left sidebar)

### Step 2: Create the Reservations Table

Copy and paste the following SQL code into the SQL Editor and click **RUN**:

```sql
-- Create reservations table
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size > 0 AND party_size <= 20),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    special_requests TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reservations_date ON public.reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for reservation form)
CREATE POLICY "Allow public to insert reservations"
ON public.reservations
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to allow authenticated users to view all reservations
CREATE POLICY "Allow authenticated users to view reservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (true);

-- Create policy to allow authenticated users to update reservations
CREATE POLICY "Allow authenticated users to update reservations"
ON public.reservations
FOR UPDATE
TO authenticated
USING (true);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reservations_updated_at
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE public.reservations IS 'Table for storing restaurant table reservations';
```

### Step 3: Verify the Table

1. Go to **Table Editor** in the left sidebar
2. You should see a new table called `reservations`
3. Click on it to view the structure

### Step 4: Test the Website

1. Open `index.html` in your browser
2. Navigate to the Reservations section
3. Fill out the form and submit
4. Check the Supabase Table Editor to see if the reservation was saved

## Table Structure

| Column Name        | Type      | Description                                    |
|-------------------|-----------|------------------------------------------------|
| id                | UUID      | Primary key, auto-generated                    |
| created_at        | TIMESTAMP | When the reservation was created               |
| customer_name     | VARCHAR   | Customer's full name                           |
| customer_email    | VARCHAR   | Customer's email address                       |
| customer_phone    | VARCHAR   | Customer's phone number                        |
| party_size        | INTEGER   | Number of people (1-20)                        |
| reservation_date  | DATE      | Date of reservation                            |
| reservation_time  | TIME      | Time of reservation                            |
| special_requests  | TEXT      | Any special requests or dietary restrictions   |
| status            | VARCHAR   | Status: pending, confirmed, cancelled, completed|
| updated_at        | TIMESTAMP | Last update timestamp                          |

## Managing Reservations

### View Reservations

You can view all reservations in the Supabase Table Editor or create a simple admin page to manage them.

### Update Reservation Status

To manually update a reservation status:

1. Go to Table Editor → reservations
2. Click on a row
3. Change the `status` field to: `confirmed`, `cancelled`, or `completed`
4. Save

### Export Reservations

You can export reservations as CSV from the Table Editor for record-keeping.

## Security Notes

- **Row Level Security (RLS)** is enabled to protect data
- Public users can only INSERT new reservations
- Only authenticated Supabase users can VIEW and UPDATE reservations
- The anon key is safe to use in the frontend as it has limited permissions

## Optional: Email Notifications

To receive email notifications when a new reservation is made, you can set up a Supabase Edge Function or use a third-party service like Zapier to monitor the table and send emails.

## Troubleshooting

### Error: "relation 'public.reservations' does not exist"

This means the table hasn't been created yet. Follow Step 2 above.

### Error: "permission denied"

Check that Row Level Security policies are correctly set up in Step 2.

### Reservations not appearing

1. Check browser console for errors
2. Verify Supabase URL and Key in `script.js`
3. Check Table Editor to see if data is being inserted

## Support

For any issues with Supabase setup, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase SQL Editor Guide](https://supabase.com/docs/guides/database/overview)
