--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-04-15 14:04:32

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
-- TOC entry 5 (class 2615 OID 21607)
-- Name: public; Type: SCHEMA; Schema: -; Owner: mirai_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO mirai_user;

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: mirai_user
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 871 (class 1247 OID 21632)
-- Name: ApplicationStatus; Type: TYPE; Schema: public; Owner: mirai_user
--

CREATE TYPE public."ApplicationStatus" AS ENUM (
    'sent',
    'accepted',
    'rejected'
);


ALTER TYPE public."ApplicationStatus" OWNER TO mirai_user;

--
-- TOC entry 898 (class 1247 OID 21786)
-- Name: MissionStatus; Type: TYPE; Schema: public; Owner: mirai_user
--

CREATE TYPE public."MissionStatus" AS ENUM (
    'pending',
    'in_progress',
    'completed',
    'cancelled'
);


ALTER TYPE public."MissionStatus" OWNER TO mirai_user;

--
-- TOC entry 910 (class 1247 OID 25197)
-- Name: ReviewType; Type: TYPE; Schema: public; Owner: mirai_user
--

CREATE TYPE public."ReviewType" AS ENUM (
    'company_to_freelancer',
    'freelancer_to_company'
);


ALTER TYPE public."ReviewType" OWNER TO mirai_user;

--
-- TOC entry 868 (class 1247 OID 21618)
-- Name: Role; Type: TYPE; Schema: public; Owner: mirai_user
--

CREATE TYPE public."Role" AS ENUM (
    'freelancer',
    'company'
);


ALTER TYPE public."Role" OWNER TO mirai_user;

--
-- TOC entry 874 (class 1247 OID 21640)
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: mirai_user
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'pending',
    'paid',
    'canceled'
);


ALTER TYPE public."TransactionStatus" OWNER TO mirai_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 233 (class 1259 OID 24118)
-- Name: Conversation; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public."Conversation" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Conversation" OWNER TO mirai_user;

--
-- TOC entry 232 (class 1259 OID 24117)
-- Name: Conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: mirai_user
--

CREATE SEQUENCE public."Conversation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Conversation_id_seq" OWNER TO mirai_user;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 232
-- Name: Conversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mirai_user
--

ALTER SEQUENCE public."Conversation_id_seq" OWNED BY public."Conversation".id;


--
-- TOC entry 235 (class 1259 OID 24126)
-- Name: Message; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public."Message" (
    id integer NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "senderId" integer NOT NULL,
    "conversationId" integer NOT NULL,
    read boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Message" OWNER TO mirai_user;

--
-- TOC entry 234 (class 1259 OID 24125)
-- Name: Message_id_seq; Type: SEQUENCE; Schema: public; Owner: mirai_user
--

CREATE SEQUENCE public."Message_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Message_id_seq" OWNER TO mirai_user;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 234
-- Name: Message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mirai_user
--

ALTER SEQUENCE public."Message_id_seq" OWNED BY public."Message".id;


--
-- TOC entry 236 (class 1259 OID 24136)
-- Name: _ConversationParticipants; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public."_ConversationParticipants" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_ConversationParticipants" OWNER TO mirai_user;

--
-- TOC entry 217 (class 1259 OID 21608)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO mirai_user;

--
-- TOC entry 225 (class 1259 OID 21679)
-- Name: applications; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public.applications (
    id integer NOT NULL,
    mission_id integer NOT NULL,
    status public."ApplicationStatus" DEFAULT 'sent'::public."ApplicationStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    freelancer_id integer NOT NULL
);


ALTER TABLE public.applications OWNER TO mirai_user;

--
-- TOC entry 224 (class 1259 OID 21678)
-- Name: applications_id_seq; Type: SEQUENCE; Schema: public; Owner: mirai_user
--

CREATE SEQUENCE public.applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.applications_id_seq OWNER TO mirai_user;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 224
-- Name: applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mirai_user
--

ALTER SEQUENCE public.applications_id_seq OWNED BY public.applications.id;


--
-- TOC entry 229 (class 1259 OID 21707)
-- Name: matching; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public.matching (
    id integer NOT NULL,
    user_id integer NOT NULL,
    mission_id integer NOT NULL,
    score double precision NOT NULL,
    date_matched timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.matching OWNER TO mirai_user;

--
-- TOC entry 228 (class 1259 OID 21706)
-- Name: matching_id_seq; Type: SEQUENCE; Schema: public; Owner: mirai_user
--

CREATE SEQUENCE public.matching_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.matching_id_seq OWNER TO mirai_user;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 228
-- Name: matching_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mirai_user
--

ALTER SEQUENCE public.matching_id_seq OWNED BY public.matching.id;


--
-- TOC entry 223 (class 1259 OID 21668)
-- Name: missions; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public.missions (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    budget numeric(65,30) NOT NULL,
    status public."MissionStatus" DEFAULT 'pending'::public."MissionStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    category text NOT NULL,
    company_id integer NOT NULL,
    "requiredSkills" text[],
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.missions OWNER TO mirai_user;

--
-- TOC entry 222 (class 1259 OID 21667)
-- Name: missions_id_seq; Type: SEQUENCE; Schema: public; Owner: mirai_user
--

CREATE SEQUENCE public.missions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.missions_id_seq OWNER TO mirai_user;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 222
-- Name: missions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mirai_user
--

ALTER SEQUENCE public.missions_id_seq OWNED BY public.missions.id;


--
-- TOC entry 221 (class 1259 OID 21659)
-- Name: profiles; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public.profiles (
    id integer NOT NULL,
    user_id integer NOT NULL,
    type public."Role" NOT NULL,
    details jsonb NOT NULL
);


ALTER TABLE public.profiles OWNER TO mirai_user;

--
-- TOC entry 220 (class 1259 OID 21658)
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: mirai_user
--

CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profiles_id_seq OWNER TO mirai_user;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 220
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mirai_user
--

ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;


--
-- TOC entry 231 (class 1259 OID 21715)
-- Name: reviews; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer NOT NULL,
    reviewer_id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mission_id integer NOT NULL,
    type public."ReviewType" DEFAULT 'company_to_freelancer'::public."ReviewType" NOT NULL
);


ALTER TABLE public.reviews OWNER TO mirai_user;

--
-- TOC entry 230 (class 1259 OID 21714)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: mirai_user
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO mirai_user;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 230
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mirai_user
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 227 (class 1259 OID 21688)
-- Name: transactions; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    mission_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    status public."TransactionStatus" DEFAULT 'pending'::public."TransactionStatus" NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.transactions OWNER TO mirai_user;

--
-- TOC entry 226 (class 1259 OID 21687)
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: mirai_user
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_seq OWNER TO mirai_user;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 226
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mirai_user
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- TOC entry 219 (class 1259 OID 21648)
-- Name: users; Type: TABLE; Schema: public; Owner: mirai_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'freelancer'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO mirai_user;

--
-- TOC entry 218 (class 1259 OID 21647)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: mirai_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO mirai_user;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mirai_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4826 (class 2604 OID 24121)
-- Name: Conversation id; Type: DEFAULT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public."Conversation" ALTER COLUMN id SET DEFAULT nextval('public."Conversation_id_seq"'::regclass);


--
-- TOC entry 4828 (class 2604 OID 24129)
-- Name: Message id; Type: DEFAULT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public."Message" ALTER COLUMN id SET DEFAULT nextval('public."Message_id_seq"'::regclass);


--
-- TOC entry 4815 (class 2604 OID 21682)
-- Name: applications id; Type: DEFAULT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.applications ALTER COLUMN id SET DEFAULT nextval('public.applications_id_seq'::regclass);


--
-- TOC entry 4821 (class 2604 OID 21710)
-- Name: matching id; Type: DEFAULT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.matching ALTER COLUMN id SET DEFAULT nextval('public.matching_id_seq'::regclass);


--
-- TOC entry 4812 (class 2604 OID 21671)
-- Name: missions id; Type: DEFAULT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.missions ALTER COLUMN id SET DEFAULT nextval('public.missions_id_seq'::regclass);


--
-- TOC entry 4811 (class 2604 OID 21662)
-- Name: profiles id; Type: DEFAULT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);


--
-- TOC entry 4823 (class 2604 OID 21718)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4818 (class 2604 OID 21691)
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- TOC entry 4807 (class 2604 OID 21651)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5035 (class 0 OID 24118)
-- Dependencies: 233
-- Data for Name: Conversation; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public."Conversation" (id, "createdAt", "updatedAt") FROM stdin;
1	2025-03-28 10:28:56.605	2025-03-28 10:28:56.605
\.


--
-- TOC entry 5037 (class 0 OID 24126)
-- Dependencies: 235
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public."Message" (id, content, "createdAt", "updatedAt", "senderId", "conversationId", read) FROM stdin;
1	Bonjour, je suis intéressé par ce que vous proposer.	2025-03-28 10:31:30.652	2025-03-28 10:57:31.886	5	1	t
\.


--
-- TOC entry 5038 (class 0 OID 24136)
-- Dependencies: 236
-- Data for Name: _ConversationParticipants; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public."_ConversationParticipants" ("A", "B") FROM stdin;
1	1
1	5
\.


--
-- TOC entry 5019 (class 0 OID 21608)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
efa0d3e7-907c-4bdf-958f-55cc2e8319bf	be6d937fa8e4288acf1543df32488a1b0259a4b6ff5f1ece606dccbf36f043de	2025-03-27 10:03:12.146851+01	20250316222223_init	\N	\N	2025-03-27 10:03:12.055008+01	1
4563b03d-0f94-452c-bf95-f7853bd01bf9	d0c6bb0ed20733eb16e8ccce0c34c0280d16e20695a5646083c0b24ea29c9a37	2025-03-27 10:03:12.154429+01	20250317230118_add_email_verification	\N	\N	2025-03-27 10:03:12.148533+01	1
d816049b-f17a-40c5-940f-3d187ac3779b	671d3bbd733ea0f78ce600d4d55b53394b28caeeda1476d9fb1dea04e324dbcb	2025-03-27 10:03:12.16022+01	20250317230459_update_user_schema	\N	\N	2025-03-27 10:03:12.155644+01	1
58d447d4-4776-451d-8515-06007436142e	ecc2778a5662853081c5af38a3d7333f6a392f1ec63bded099a54d96774d6133	2025-03-27 10:03:12.16551+01	20250318015855_remove_email_verification	\N	\N	2025-03-27 10:03:12.16145+01	1
35e78875-8f8b-41d3-91e7-11f7b609c9ec	d844afec7aafecdd925de940aa6ebaabd5945f4a7bbb74ef32cdbcdb57f7d70e	2025-03-27 10:03:12.203715+01	20250327085834_init	\N	\N	2025-03-27 10:03:12.166878+01	1
046f0c67-78d5-47c1-9598-1d243407205c	3dd11d8e693e95ca1c8294bed88d60ea48b848a148aad12d7b9ddcc24cdb25b9	2025-03-28 11:24:00.752495+01	20250328102400_add_messaging	\N	\N	2025-03-28 11:24:00.690282+01	1
38de809c-7201-4c75-8693-accc48886773	81f025fc48d2c2c5bc3c5c93f002eaf2cdc3b8f54baab289d64770c95bd3b338	2025-04-10 08:41:09.119552+02	20250410064109_add_review_system	\N	\N	2025-04-10 08:41:09.097099+02	1
\.


--
-- TOC entry 5027 (class 0 OID 21679)
-- Dependencies: 225
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.applications (id, mission_id, status, created_at, freelancer_id) FROM stdin;
2	1	sent	2025-04-10 07:58:22.311	1
1	1	accepted	2025-04-10 07:54:41.413	7
\.


--
-- TOC entry 5031 (class 0 OID 21707)
-- Dependencies: 229
-- Data for Name: matching; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.matching (id, user_id, mission_id, score, date_matched) FROM stdin;
\.


--
-- TOC entry 5025 (class 0 OID 21668)
-- Dependencies: 223
-- Data for Name: missions; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.missions (id, title, description, budget, status, created_at, category, company_id, "requiredSkills", updated_at) FROM stdin;
2	Rédaction de contenu marketing	Rédaction d'articles de blog et de contenu pour les réseaux sociaux.	1500.000000000000000000000000000000	pending	2025-03-27 10:08:25.93	marketing	1	{rédaction,marketing,seo,"social media"}	2025-03-27 10:08:25.93
3	Développement d'une application mobile	Nous recherchons un développeur mobile pour créer une application iOS et Android.	5000.000000000000000000000000000000	pending	2025-03-27 10:08:25.93	développement	1	{mobile,android,ios,react,typescript}	2025-03-27 10:08:25.93
1	Design d'interface utilisateur	Création d'une interface utilisateur moderne pour une application web.	2000.000000000000000000000000000000	completed	2025-03-27 10:08:25.93	design	1	{ui,ux,figma,design,prototype}	2025-04-10 08:35:21.215
\.


--
-- TOC entry 5023 (class 0 OID 21659)
-- Dependencies: 221
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.profiles (id, user_id, type, details) FROM stdin;
1	1	company	{"website": "https://testcompany.com", "location": "Paris, France", "description": "Une entreprise de test pour le développement"}
5	5	freelancer	{"skills": ["mobile", "android", "ios", "react", "typescript", "flutter"], "location": "Paris, France", "experience": {"years": 5, "projects": 15, "certifications": 3}, "hourlyRate": 80, "description": "Développeur mobile expérimenté"}
6	6	freelancer	{"skills": ["marketing", "seo", "social media", "content writing", "analytics"], "location": "Bordeaux, France", "experience": {"years": 4, "projects": 12, "certifications": 4}, "hourlyRate": 60, "description": "Expert en marketing digital"}
7	7	freelancer	{"skills": ["ui", "ux", "figma", "design", "prototype", "user research"], "location": "Lyon, France", "experience": {"years": 3, "projects": 8, "certifications": 2}, "hourlyRate": 70, "description": "Designer UI/UX créatif"}
\.


--
-- TOC entry 5033 (class 0 OID 21715)
-- Dependencies: 231
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.reviews (id, user_id, reviewer_id, rating, comment, date, mission_id, type) FROM stdin;
1	7	1	5	Excellent travail sur le design de l'interface. Sarah a parfaitement compris nos besoins et livré un travail de qualité.	2025-04-10 08:46:06.073	1	company_to_freelancer
2	1	7	5	Excellente expérience ! Mission bien définie, communication claire et paiement rapide.	2025-04-10 09:42:08.722	1	freelancer_to_company
\.


--
-- TOC entry 5029 (class 0 OID 21688)
-- Dependencies: 227
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.transactions (id, mission_id, amount, status, date) FROM stdin;
\.


--
-- TOC entry 5021 (class 0 OID 21648)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mirai_user
--

COPY public.users (id, name, email, password, role, "createdAt", "updatedAt") FROM stdin;
1	Test Company	company@test.com	$2b$10$EMerudq1aUJJU2cYdxaHauRTpPeKuxC7qYeGrQzTjLlDDW6zn9VG.	company	2025-03-28 11:24:00.7	2025-03-28 11:24:00.7
5	John Mobile	mobile.dev@test.com	$2b$10$S5M6oySci.ssFAgj1WeO1OCarmLfZkPMJ/pJ8qahVeRmlzPj5iaJa	freelancer	2025-03-28 11:24:00.7	2025-03-28 11:24:00.7
6	Mike Marketer	marketer@test.com	$2b$10$XdqMI3A7OJbxwJEN4iO35u3msMWAxw6eXOs/1NqG3g1IQI1kjXrh2	freelancer	2025-03-28 11:24:00.7	2025-03-28 11:24:00.7
7	Sarah Designer	designer@test.com	$2b$10$6lw1uWOtUP9rZxaDcNc.BeqcXiG7WxfUIThZmmuSEBdyGHVEskMYi	freelancer	2025-03-28 11:24:00.7	2025-03-28 11:24:00.7
\.


--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 232
-- Name: Conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public."Conversation_id_seq"', 1, true);


--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 234
-- Name: Message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public."Message_id_seq"', 1, true);


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 224
-- Name: applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.applications_id_seq', 2, true);


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 228
-- Name: matching_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.matching_id_seq', 1, false);


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 222
-- Name: missions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.missions_id_seq', 3, true);


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 220
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.profiles_id_seq', 7, true);


--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 230
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.reviews_id_seq', 2, true);


--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 226
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);


--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mirai_user
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- TOC entry 4852 (class 2606 OID 24124)
-- Name: Conversation Conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY (id);


--
-- TOC entry 4855 (class 2606 OID 24135)
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- TOC entry 4858 (class 2606 OID 24140)
-- Name: _ConversationParticipants _ConversationParticipants_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public."_ConversationParticipants"
    ADD CONSTRAINT "_ConversationParticipants_AB_pkey" PRIMARY KEY ("A", "B");


--
-- TOC entry 4832 (class 2606 OID 21616)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4842 (class 2606 OID 21686)
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- TOC entry 4847 (class 2606 OID 21713)
-- Name: matching matching_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.matching
    ADD CONSTRAINT matching_pkey PRIMARY KEY (id);


--
-- TOC entry 4840 (class 2606 OID 21677)
-- Name: missions missions_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_pkey PRIMARY KEY (id);


--
-- TOC entry 4837 (class 2606 OID 21666)
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 4850 (class 2606 OID 21723)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4845 (class 2606 OID 21695)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- TOC entry 4835 (class 2606 OID 21657)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4853 (class 1259 OID 24141)
-- Name: Message_conversationId_idx; Type: INDEX; Schema: public; Owner: mirai_user
--

CREATE INDEX "Message_conversationId_idx" ON public."Message" USING btree ("conversationId");


--
-- TOC entry 4856 (class 1259 OID 24142)
-- Name: Message_senderId_idx; Type: INDEX; Schema: public; Owner: mirai_user
--

CREATE INDEX "Message_senderId_idx" ON public."Message" USING btree ("senderId");


--
-- TOC entry 4859 (class 1259 OID 24143)
-- Name: _ConversationParticipants_B_index; Type: INDEX; Schema: public; Owner: mirai_user
--

CREATE INDEX "_ConversationParticipants_B_index" ON public."_ConversationParticipants" USING btree ("B");


--
-- TOC entry 4838 (class 1259 OID 21725)
-- Name: profiles_user_id_key; Type: INDEX; Schema: public; Owner: mirai_user
--

CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id);


--
-- TOC entry 4848 (class 1259 OID 25202)
-- Name: reviews_mission_id_reviewer_id_key; Type: INDEX; Schema: public; Owner: mirai_user
--

CREATE UNIQUE INDEX reviews_mission_id_reviewer_id_key ON public.reviews USING btree (mission_id, reviewer_id);


--
-- TOC entry 4843 (class 1259 OID 21726)
-- Name: transactions_mission_id_key; Type: INDEX; Schema: public; Owner: mirai_user
--

CREATE UNIQUE INDEX transactions_mission_id_key ON public.transactions USING btree (mission_id);


--
-- TOC entry 4833 (class 1259 OID 21724)
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: mirai_user
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- TOC entry 4870 (class 2606 OID 24149)
-- Name: Message Message_conversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public."Conversation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4871 (class 2606 OID 24144)
-- Name: Message Message_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4872 (class 2606 OID 24154)
-- Name: _ConversationParticipants _ConversationParticipants_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public."_ConversationParticipants"
    ADD CONSTRAINT "_ConversationParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES public."Conversation"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4873 (class 2606 OID 24159)
-- Name: _ConversationParticipants _ConversationParticipants_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public."_ConversationParticipants"
    ADD CONSTRAINT "_ConversationParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4862 (class 2606 OID 21815)
-- Name: applications applications_freelancer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_freelancer_id_fkey FOREIGN KEY (freelancer_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4863 (class 2606 OID 21820)
-- Name: applications applications_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4865 (class 2606 OID 21767)
-- Name: matching matching_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.matching
    ADD CONSTRAINT matching_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4866 (class 2606 OID 21762)
-- Name: matching matching_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.matching
    ADD CONSTRAINT matching_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4861 (class 2606 OID 21810)
-- Name: missions missions_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4860 (class 2606 OID 21727)
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4867 (class 2606 OID 25203)
-- Name: reviews reviews_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4868 (class 2606 OID 21777)
-- Name: reviews reviews_reviewer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4869 (class 2606 OID 21772)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4864 (class 2606 OID 21747)
-- Name: transactions transactions_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mirai_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: mirai_user
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-04-15 14:04:32

--
-- PostgreSQL database dump complete
--

