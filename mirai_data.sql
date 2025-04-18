--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.users (id, name, email, password, role, "createdAt", "updatedAt") FROM stdin;
1	Test Company	company@test.com	$2b$10$EMerudq1aUJJU2cYdxaHauRTpPeKuxC7qYeGrQzTjLlDDW6zn9VG.	company	2025-03-28 11:24:00.7	2025-03-28 11:24:00.7
5	John Mobile	mobile.dev@test.com	$2b$10$S5M6oySci.ssFAgj1WeO1OCarmLfZkPMJ/pJ8qahVeRmlzPj5iaJa	freelancer	2025-03-28 11:24:00.7	2025-03-28 11:24:00.7
6	Mike Marketer	marketer@test.com	$2b$10$XdqMI3A7OJbxwJEN4iO35u3msMWAxw6eXOs/1NqG3g1IQI1kjXrh2	freelancer	2025-03-28 11:24:00.7	2025-03-28 11:24:00.7
7	Sarah Designer	designer@test.com	$2b$10$6lw1uWOtUP9rZxaDcNc.BeqcXiG7WxfUIThZmmuSEBdyGHVEskMYi	freelancer	2025-03-28 11:24:00.7	2025-03-28 11:24:00.7
\.


--
-- Data for Name: missions; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.missions (id, title, description, budget, status, created_at, category, company_id, "requiredSkills", updated_at) FROM stdin;
2	R├®daction de contenu marketing	R├®daction d'articles de blog et de contenu pour les r├®seaux sociaux.	1500.000000000000000000000000000000	pending	2025-03-27 10:08:25.93	marketing	1	{r├®daction,marketing,seo,"social media"}	2025-03-27 10:08:25.93
3	D├®veloppement d'une application mobile	Nous recherchons un d├®veloppeur mobile pour cr├®er une application iOS et Android.	5000.000000000000000000000000000000	pending	2025-03-27 10:08:25.93	d├®veloppement	1	{mobile,android,ios,react,typescript}	2025-03-27 10:08:25.93
1	Design d'interface utilisateur	Cr├®ation d'une interface utilisateur moderne pour une application web.	2000.000000000000000000000000000000	completed	2025-03-27 10:08:25.93	design	1	{ui,ux,figma,design,prototype}	2025-04-10 08:35:21.215
\.


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.applications (id, mission_id, status, created_at, freelancer_id) FROM stdin;
2	1	sent	2025-04-10 07:58:22.311	1
1	1	accepted	2025-04-10 07:54:41.413	7
\.


--
-- Data for Name: matching; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.matching (id, user_id, mission_id, score, date_matched) FROM stdin;
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.profiles (id, user_id, type, details) FROM stdin;
1	1	company	{"website": "https://testcompany.com", "location": "Paris, France", "description": "Une entreprise de test pour le d├®veloppement"}
5	5	freelancer	{"skills": ["mobile", "android", "ios", "react", "typescript", "flutter"], "location": "Paris, France", "experience": {"years": 5, "projects": 15, "certifications": 3}, "hourlyRate": 80, "description": "D├®veloppeur mobile exp├®riment├®"}
6	6	freelancer	{"skills": ["marketing", "seo", "social media", "content writing", "analytics"], "location": "Bordeaux, France", "experience": {"years": 4, "projects": 12, "certifications": 4}, "hourlyRate": 60, "description": "Expert en marketing digital"}
7	7	freelancer	{"skills": ["ui", "ux", "figma", "design", "prototype", "user research"], "location": "Lyon, France", "experience": {"years": 3, "projects": 8, "certifications": 2}, "hourlyRate": 70, "description": "Designer UI/UX cr├®atif"}
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.reviews (id, user_id, reviewer_id, rating, comment, date, mission_id, type) FROM stdin;
1	7	1	5	Excellent travail sur le design de l'interface. Sarah a parfaitement compris nos besoins et livr├® un travail de qualit├®.	2025-04-10 08:46:06.073	1	company_to_freelancer
2	1	7	5	Excellente exp├®rience ! Mission bien d├®finie, communication claire et paiement rapide.	2025-04-10 09:42:08.722	1	freelancer_to_company
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.transactions (id, mission_id, amount, status, date) FROM stdin;
\.


--
-- Name: applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.applications_id_seq', 2, true);


--
-- Name: matching_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.matching_id_seq', 1, false);


--
-- Name: missions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.missions_id_seq', 3, true);


--
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.profiles_id_seq', 7, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.reviews_id_seq', 2, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- PostgreSQL database dump complete
--

