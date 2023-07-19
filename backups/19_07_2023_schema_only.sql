--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: CustomerBookRequest; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."CustomerBookRequest" (
    "customerID" integer NOT NULL,
    "customerPhoneNumber" "text" NOT NULL,
    "customerName" "text" NOT NULL,
    "bookTitle" "text" NOT NULL,
    "bookAuthor" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: CustomerBookRequest_customerID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."CustomerBookRequest_customerID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: CustomerBookRequest_customerID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."CustomerBookRequest_customerID_seq" OWNED BY "public"."CustomerBookRequest"."customerID";


--
-- Name: Sales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."Sales" (
    "saleID" integer NOT NULL,
    "isbn" "text" NOT NULL,
    "title" "text" NOT NULL,
    "author" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: SalesStats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."SalesStats" (
    "date" "text" NOT NULL,
    "addedBooks" integer NOT NULL,
    "removedBooks" integer NOT NULL
);


--
-- Name: Sales_saleID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."Sales_saleID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Sales_saleID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."Sales_saleID_seq" OWNED BY "public"."Sales"."saleID";


--
-- Name: ScannedBook; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."ScannedBook" (
    "bookID" integer NOT NULL,
    "barcode" "text" NOT NULL,
    "isbn" "text" NOT NULL,
    "title" "text" NOT NULL,
    "author" "text" NOT NULL,
    "year" "text" NOT NULL,
    "publisher" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: ScannedBook_bookID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."ScannedBook_bookID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ScannedBook_bookID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."ScannedBook_bookID_seq" OWNED BY "public"."ScannedBook"."bookID";


--
-- Name: StoredBooks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."StoredBooks" (
    "barcode" "text" NOT NULL,
    "isbn" "text" NOT NULL,
    "title" "text" NOT NULL,
    "author" "text" NOT NULL,
    "year" "text" NOT NULL,
    "publisher" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);


--
-- Name: CustomerBookRequest customerID; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."CustomerBookRequest" ALTER COLUMN "customerID" SET DEFAULT "nextval"('"public"."CustomerBookRequest_customerID_seq"'::"regclass");


--
-- Name: Sales saleID; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Sales" ALTER COLUMN "saleID" SET DEFAULT "nextval"('"public"."Sales_saleID_seq"'::"regclass");


--
-- Name: ScannedBook bookID; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."ScannedBook" ALTER COLUMN "bookID" SET DEFAULT "nextval"('"public"."ScannedBook_bookID_seq"'::"regclass");


--
-- Name: CustomerBookRequest CustomerBookRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."CustomerBookRequest"
    ADD CONSTRAINT "CustomerBookRequest_pkey" PRIMARY KEY ("customerID");


--
-- Name: SalesStats SalesStats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."SalesStats"
    ADD CONSTRAINT "SalesStats_pkey" PRIMARY KEY ("date");


--
-- Name: Sales Sales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."Sales"
    ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleID");


--
-- Name: ScannedBook ScannedBook_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."ScannedBook"
    ADD CONSTRAINT "ScannedBook_pkey" PRIMARY KEY ("bookID");


--
-- Name: StoredBooks StoredBooks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."StoredBooks"
    ADD CONSTRAINT "StoredBooks_pkey" PRIMARY KEY ("barcode");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");


--
-- Name: StoredBooks_barcode_isbn_title_author_year_publisher_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "StoredBooks_barcode_isbn_title_author_year_publisher_key" ON "public"."StoredBooks" USING "btree" ("barcode", "isbn", "title", "author", "year", "publisher");


--
-- Name: StoredBooks_barcode_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "StoredBooks_barcode_key" ON "public"."StoredBooks" USING "btree" ("barcode");


--
-- Name: ScannedBook ScannedBook_barcode_isbn_title_author_year_publisher_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."ScannedBook"
    ADD CONSTRAINT "ScannedBook_barcode_isbn_title_author_year_publisher_fkey" FOREIGN KEY ("barcode", "isbn", "title", "author", "year", "publisher") REFERENCES "public"."StoredBooks"("barcode", "isbn", "title", "author", "year", "publisher") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

