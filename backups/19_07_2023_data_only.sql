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
-- Data for Name: CustomerBookRequest; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: Sales; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."Sales" VALUES (1, '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2023-07-05 07:27:56.367');
INSERT INTO "public"."Sales" VALUES (2, '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2023-07-05 07:30:29.691');
INSERT INTO "public"."Sales" VALUES (3, '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2023-07-05 07:30:39.591');
INSERT INTO "public"."Sales" VALUES (4, '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2023-07-05 07:31:16.324');
INSERT INTO "public"."Sales" VALUES (5, '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2023-07-05 08:02:02.386');
INSERT INTO "public"."Sales" VALUES (6, '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2023-07-18 07:05:21.78');


--
-- Data for Name: SalesStats; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."SalesStats" VALUES ('05/07/2023', 9, 8);
INSERT INTO "public"."SalesStats" VALUES ('11/07/2023', 60, 0);
INSERT INTO "public"."SalesStats" VALUES ('18/07/2023', 13, 1);


--
-- Data for Name: StoredBooks; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."StoredBooks" VALUES ('9781526617163', '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2020', 'Bloomsbury Publishing', '2023-07-05 08:00:32.59');
INSERT INTO "public"."StoredBooks" VALUES ('9781853041563', '9781853041563', 'The Bluffer''s Guide to Espionage', 'n/a', '1989', 'Ravette Publishing Ltd', '2023-07-11 08:40:48.765');
INSERT INTO "public"."StoredBooks" VALUES ('9781250044655', '9781250044655', 'Heartless', 'Marissa Meyer', '2016', 'Feiwel & Friends', '2023-07-11 08:46:27.555');
INSERT INTO "public"."StoredBooks" VALUES ('9781398717206', '9781398717206', 'Magnolia Parks', 'Jessa Hastings', '2022', 'Orion Publishing Group, Limited', '2023-07-11 08:46:49.179');
INSERT INTO "public"."StoredBooks" VALUES ('9780358701491', '9780358701491', 'American Ramble', 'Neil King', '2023', 'HarperCollins Publishers, Mariner Books', '2023-07-11 08:47:05.703');
INSERT INTO "public"."StoredBooks" VALUES ('9780062278227', '9780062278227', 'Nimona', 'Noelle Stevenson', ' 2015', 'Quill Tree Books', '2023-07-11 09:00:28.295');
INSERT INTO "public"."StoredBooks" VALUES ('9781250618849', '9781250618849', 'Gilded', 'Marissa Meyer', ' 2021', 'Feiwel & Friends', '2023-07-11 09:00:36.011');
INSERT INTO "public"."StoredBooks" VALUES ('9781649374042', '9781649374042', 'Scorched in Stone', 'Rebecca Yarros', '2023', 'Entangled Publishing, LLC', '2023-07-11 09:01:28.829');
INSERT INTO "public"."StoredBooks" VALUES ('9781957779072', '9781957779072', 'The Ashes and the Star-Cursed King', 'Carissa Broadbent', ' 2023', 'Nasyra Publishing', '2023-07-11 09:12:39.831');
INSERT INTO "public"."StoredBooks" VALUES ('9780316158237', '9780316158237', 'Belladonna', 'Adalyn Grace', '2022', 'Little, Brown Books for Young Readers', '2023-07-11 09:17:45.087');
INSERT INTO "public"."StoredBooks" VALUES ('9781250268426', '9781250268426', 'Ballad of Never After', 'Stephanie Garber', '2022', 'Flatiron Books', '2023-07-11 09:17:59.143');
INSERT INTO "public"."StoredBooks" VALUES ('9781250268396', '9781250268396', 'Once Upon a Broken Heart', 'Stephanie Garber', '2021', 'Flatiron Books', '2023-07-11 09:18:26.186');
INSERT INTO "public"."StoredBooks" VALUES ('9781957779027', '9781957779027', 'Serpent and the Wings of Night', 'Carissa Broadbent', '2022', 'Nasyra Publishing', '2023-07-11 09:19:05.39');
INSERT INTO "public"."StoredBooks" VALUES ('9781957779041', '9781957779041', 'Six Scorched Roses', 'Carissa Broadbent', '2023', 'Nasyra Publishing', '2023-07-11 09:21:31.642');
INSERT INTO "public"."StoredBooks" VALUES ('9780998461939', '9780998461939', 'Daughter of No Worlds', 'Carissa Broadbent', '2020', 'Carissa Broadbent', '2023-07-11 09:22:07.774');
INSERT INTO "public"."StoredBooks" VALUES ('9780998461984', '9780998461984', 'Mother of Death and Dawn', 'Carissa Broadbent', '2022', 'Nasyra Publishing', '2023-07-11 09:22:19.52');
INSERT INTO "public"."StoredBooks" VALUES ('9780998461953', '9780998461953', 'Children of Fallen Gods ', ' Carissa Broadbent', '2021', 'Nasyra Publishing', '2023-07-11 09:22:35.764');
INSERT INTO "public"."StoredBooks" VALUES ('9780140276800', '9780140276800', 'The Tower on the Rift - Volume Two of the View from the Mirror Quartet', 'Irvine Ian', '1998', 'Penquin Books', '2023-07-11 09:23:21.942');
INSERT INTO "public"."StoredBooks" VALUES ('9780061340444', '9780061340444', 'Nightmare Academy', 'Dean Lorey', '2008', 'HarperTrophy', '2023-07-11 09:25:54.797');
INSERT INTO "public"."StoredBooks" VALUES ('9780061340505', '9780061340505', 'Monster war', 'Dean Lorey', '2010', 'HarperCollinsPublishers', '2023-07-11 09:26:24.279');
INSERT INTO "public"."StoredBooks" VALUES ('9780718115814', '9780718115814', 'The country diary of an Edwardian lady', ' Edith Holden', '1977', 'Webb & Bower', '2023-07-11 09:28:52.445');
INSERT INTO "public"."StoredBooks" VALUES ('9780373586165', '9780373586165', 'Philly and the Playboy ', ' Linda Turner', '1992', 'Silhouette Books', '2023-07-11 09:30:00.132');
INSERT INTO "public"."StoredBooks" VALUES ('9782280125529', '9782280125529', 'Enquete sur un seducteur  the seducer  ', 'Turner Linda', '1994', 'Collection Harlequin Serie Rouge Passion N 548', '2023-07-11 09:41:18.133');
INSERT INTO "public"."StoredBooks" VALUES ('9798388678881', '9798388678881', 'What Lurks Between the Fates  ', ' Harper L Woods,  Adelaide  Forrest', '2023', 'Independently published', '2023-07-11 10:01:54.551');
INSERT INTO "public"."StoredBooks" VALUES ('9780578374000', '9780578374000', 'What Lies Beyond the Veil', 'Harper L. Woods, Adelaide Forrest', '2022', 'Adelaide Forrest', '2023-07-11 10:02:50.954');
INSERT INTO "public"."StoredBooks" VALUES ('9780571320714', '9780571320707', 'Big country fair', 'Jones, Pip (Children''s story writer)', '2016', '', '2023-07-11 10:04:40.02');
INSERT INTO "public"."StoredBooks" VALUES ('9781785042720', '9781785042720', 'Myth of Normal', 'Gabor Maté, Daniel Maté', '2022', 'Ebury Publishing', '2023-07-11 10:07:06.221');


--
-- Data for Name: ScannedBook; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."ScannedBook" VALUES (89, '9781526617163', '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2020', 'Bloomsbury Publishing', '2023-07-18 06:58:36.254');
INSERT INTO "public"."ScannedBook" VALUES (90, '9781526617163', '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2020', 'Bloomsbury Publishing', '2023-07-18 06:58:43.998');
INSERT INTO "public"."ScannedBook" VALUES (91, '9781526617163', '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2020', 'Bloomsbury Publishing', '2023-07-18 07:01:02.715');
INSERT INTO "public"."ScannedBook" VALUES (92, '9781526617163', '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2020', 'Bloomsbury Publishing', '2023-07-18 07:01:18.187');
INSERT INTO "public"."ScannedBook" VALUES (23, '9781853041563', '9781853041563', 'The Bluffer''s Guide to Espionage', 'n/a', '1989', 'Ravette Publishing Ltd', '2023-07-11 08:40:48.765');
INSERT INTO "public"."ScannedBook" VALUES (28, '9781250044655', '9781250044655', 'Heartless', 'Marissa Meyer', '2016', 'Feiwel & Friends', '2023-07-11 08:46:27.555');
INSERT INTO "public"."ScannedBook" VALUES (29, '9781398717206', '9781398717206', 'Magnolia Parks', 'Jessa Hastings', '2022', 'Orion Publishing Group, Limited', '2023-07-11 08:46:49.179');
INSERT INTO "public"."ScannedBook" VALUES (30, '9780358701491', '9780358701491', 'American Ramble', 'Neil King', '2023', 'HarperCollins Publishers, Mariner Books', '2023-07-11 08:47:05.703');
INSERT INTO "public"."ScannedBook" VALUES (31, '9781398717206', '9781398717206', 'Magnolia Parks', 'Jessa Hastings', '2022', 'Orion Publishing Group, Limited', '2023-07-11 08:47:24.012');
INSERT INTO "public"."ScannedBook" VALUES (37, '9780062278227', '9780062278227', 'Nimona', 'Noelle Stevenson', ' 2015', 'Quill Tree Books', '2023-07-11 09:00:28.295');
INSERT INTO "public"."ScannedBook" VALUES (38, '9781250618849', '9781250618849', 'Gilded', 'Marissa Meyer', ' 2021', 'Feiwel & Friends', '2023-07-11 09:00:36.011');
INSERT INTO "public"."ScannedBook" VALUES (39, '9781649374042', '9781649374042', 'Scorched in Stone', 'Rebecca Yarros', '2023', 'Entangled Publishing, LLC', '2023-07-11 09:01:28.829');
INSERT INTO "public"."ScannedBook" VALUES (43, '9781957779072', '9781957779072', 'The Ashes and the Star-Cursed King', 'Carissa Broadbent', ' 2023', 'Nasyra Publishing', '2023-07-11 09:12:39.831');
INSERT INTO "public"."ScannedBook" VALUES (46, '9780316158237', '9780316158237', 'Belladonna', 'Adalyn Grace', '2022', 'Little, Brown Books for Young Readers', '2023-07-11 09:17:45.087');
INSERT INTO "public"."ScannedBook" VALUES (47, '9781250268426', '9781250268426', 'Ballad of Never After', 'Stephanie Garber', '2022', 'Flatiron Books', '2023-07-11 09:17:59.143');
INSERT INTO "public"."ScannedBook" VALUES (48, '9781250268396', '9781250268396', 'Once Upon a Broken Heart', 'Stephanie Garber', '2021', 'Flatiron Books', '2023-07-11 09:18:26.186');
INSERT INTO "public"."ScannedBook" VALUES (49, '9781957779027', '9781957779027', 'Serpent and the Wings of Night', 'Carissa Broadbent', '2022', 'Nasyra Publishing', '2023-07-11 09:19:05.39');
INSERT INTO "public"."ScannedBook" VALUES (50, '9781957779041', '9781957779041', 'Six Scorched Roses', 'Carissa Broadbent', '2023', 'Nasyra Publishing', '2023-07-11 09:21:31.642');
INSERT INTO "public"."ScannedBook" VALUES (51, '9781957779041', '9781957779041', 'Six Scorched Roses', 'Carissa Broadbent', '2023', 'Nasyra Publishing', '2023-07-11 09:21:59.173');
INSERT INTO "public"."ScannedBook" VALUES (52, '9780998461939', '9780998461939', 'Daughter of No Worlds', 'Carissa Broadbent', '2020', 'Carissa Broadbent', '2023-07-11 09:22:07.774');
INSERT INTO "public"."ScannedBook" VALUES (53, '9780998461984', '9780998461984', 'Mother of Death and Dawn', 'Carissa Broadbent', '2022', 'Nasyra Publishing', '2023-07-11 09:22:19.52');
INSERT INTO "public"."ScannedBook" VALUES (54, '9780998461953', '9780998461953', 'Children of Fallen Gods ', ' Carissa Broadbent', '2021', 'Nasyra Publishing', '2023-07-11 09:22:35.764');
INSERT INTO "public"."ScannedBook" VALUES (55, '9781957779072', '9781957779072', 'The Ashes and the Star-Cursed King', 'Carissa Broadbent', ' 2023', 'Nasyra Publishing', '2023-07-11 09:22:56.526');
INSERT INTO "public"."ScannedBook" VALUES (56, '9780140276800', '9780140276800', 'The Tower on the Rift - Volume Two of the View from the Mirror Quartet', 'Irvine Ian', '1998', 'Penquin Books', '2023-07-11 09:23:21.942');
INSERT INTO "public"."ScannedBook" VALUES (57, '9780061340444', '9780061340444', 'Nightmare Academy', 'Dean Lorey', '2008', 'HarperTrophy', '2023-07-11 09:25:54.797');
INSERT INTO "public"."ScannedBook" VALUES (58, '9780061340505', '9780061340505', 'Monster war', 'Dean Lorey', '2010', 'HarperCollinsPublishers', '2023-07-11 09:26:24.279');
INSERT INTO "public"."ScannedBook" VALUES (61, '9780718115814', '9780718115814', 'The country diary of an Edwardian lady', ' Edith Holden', '1977', 'Webb & Bower', '2023-07-11 09:28:52.445');
INSERT INTO "public"."ScannedBook" VALUES (62, '9780373586165', '9780373586165', 'Philly and the Playboy ', ' Linda Turner', '1992', 'Silhouette Books', '2023-07-11 09:30:00.132');
INSERT INTO "public"."ScannedBook" VALUES (70, '9782280125529', '9782280125529', 'Enquete sur un seducteur  the seducer  ', 'Turner Linda', '1994', 'Collection Harlequin Serie Rouge Passion N 548', '2023-07-11 09:41:18.133');
INSERT INTO "public"."ScannedBook" VALUES (78, '9798388678881', '9798388678881', 'What Lurks Between the Fates  ', ' Harper L Woods,  Adelaide  Forrest', '2023', 'Independently published', '2023-07-11 10:01:54.551');
INSERT INTO "public"."ScannedBook" VALUES (79, '9780578374000', '9780578374000', 'What Lies Beyond the Veil', 'Harper L. Woods, Adelaide Forrest', '2022', 'Adelaide Forrest', '2023-07-11 10:02:50.954');
INSERT INTO "public"."ScannedBook" VALUES (80, '9781398717206', '9781398717206', 'Magnolia Parks', 'Jessa Hastings', '2022', 'Orion Publishing Group, Limited', '2023-07-11 10:03:45.226');
INSERT INTO "public"."ScannedBook" VALUES (81, '9780571320714', '9780571320707', 'Big country fair', 'Jones, Pip (Children''s story writer)', '2016', '', '2023-07-11 10:04:40.02');
INSERT INTO "public"."ScannedBook" VALUES (82, '9781785042720', '9781785042720', 'Myth of Normal', 'Gabor Maté, Daniel Maté', '2022', 'Ebury Publishing', '2023-07-11 10:07:06.221');
INSERT INTO "public"."ScannedBook" VALUES (88, '9781526617163', '9781526617163', 'Court of Mist and Fury', 'Sarah J. Maas', '2020', 'Bloomsbury Publishing', '2023-07-18 06:54:58.722');


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "public"."_prisma_migrations" VALUES ('887dccc7-6ca6-4c81-a8df-7171d43043db', '21a21d6d93e1c073e64ffd4170aa8f197407f311d73dddee7810cd61f36a207c', '2023-07-05 14:12:12.081213+08', '20230705061211_reset', NULL, NULL, '2023-07-05 14:12:11.590166+08', 1);


--
-- Name: CustomerBookRequest_customerID_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."CustomerBookRequest_customerID_seq"', 1, false);


--
-- Name: Sales_saleID_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."Sales_saleID_seq"', 6, true);


--
-- Name: ScannedBook_bookID_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."ScannedBook_bookID_seq"', 95, true);


--
-- PostgreSQL database dump complete
--

