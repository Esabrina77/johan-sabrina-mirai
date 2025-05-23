PGDMP  #    $                }           mirai    17.2    17.2 f    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    17350    mirai    DATABASE     x   CREATE DATABASE mirai WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE mirai;
                  
   mirai_user    false                        2615    21607    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                  
   mirai_user    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                     
   mirai_user    false    5            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                     
   mirai_user    false    5            g           1247    21632    ApplicationStatus    TYPE     _   CREATE TYPE public."ApplicationStatus" AS ENUM (
    'sent',
    'accepted',
    'rejected'
);
 &   DROP TYPE public."ApplicationStatus";
       public            
   mirai_user    false    5            �           1247    21786    MissionStatus    TYPE     s   CREATE TYPE public."MissionStatus" AS ENUM (
    'pending',
    'in_progress',
    'completed',
    'cancelled'
);
 "   DROP TYPE public."MissionStatus";
       public            
   mirai_user    false    5            �           1247    25197 
   ReviewType    TYPE     f   CREATE TYPE public."ReviewType" AS ENUM (
    'company_to_freelancer',
    'freelancer_to_company'
);
    DROP TYPE public."ReviewType";
       public            
   mirai_user    false    5            d           1247    21618    Role    TYPE     G   CREATE TYPE public."Role" AS ENUM (
    'freelancer',
    'company'
);
    DROP TYPE public."Role";
       public            
   mirai_user    false    5            j           1247    21640    TransactionStatus    TYPE     ^   CREATE TYPE public."TransactionStatus" AS ENUM (
    'pending',
    'paid',
    'canceled'
);
 &   DROP TYPE public."TransactionStatus";
       public            
   mirai_user    false    5            �            1259    24118    Conversation    TABLE     �   CREATE TABLE public."Conversation" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 "   DROP TABLE public."Conversation";
       public         heap r    
   mirai_user    false    5            �            1259    24117    Conversation_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Conversation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Conversation_id_seq";
       public            
   mirai_user    false    5    233            �           0    0    Conversation_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Conversation_id_seq" OWNED BY public."Conversation".id;
          public            
   mirai_user    false    232            �            1259    24126    Message    TABLE     S  CREATE TABLE public."Message" (
    id integer NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "senderId" integer NOT NULL,
    "conversationId" integer NOT NULL,
    read boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Message";
       public         heap r    
   mirai_user    false    5            �            1259    24125    Message_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Message_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Message_id_seq";
       public            
   mirai_user    false    235    5            �           0    0    Message_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Message_id_seq" OWNED BY public."Message".id;
          public            
   mirai_user    false    234            �            1259    24136    _ConversationParticipants    TABLE     h   CREATE TABLE public."_ConversationParticipants" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);
 /   DROP TABLE public."_ConversationParticipants";
       public         heap r    
   mirai_user    false    5            �            1259    21608    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap r    
   mirai_user    false    5            �            1259    21679    applications    TABLE     0  CREATE TABLE public.applications (
    id integer NOT NULL,
    mission_id integer NOT NULL,
    status public."ApplicationStatus" DEFAULT 'sent'::public."ApplicationStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    freelancer_id integer NOT NULL
);
     DROP TABLE public.applications;
       public         heap r    
   mirai_user    false    871    871    5            �            1259    21678    applications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.applications_id_seq;
       public            
   mirai_user    false    5    225            �           0    0    applications_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.applications_id_seq OWNED BY public.applications.id;
          public            
   mirai_user    false    224            �            1259    21707    matching    TABLE     �   CREATE TABLE public.matching (
    id integer NOT NULL,
    user_id integer NOT NULL,
    mission_id integer NOT NULL,
    score double precision NOT NULL,
    date_matched timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.matching;
       public         heap r    
   mirai_user    false    5            �            1259    21706    matching_id_seq    SEQUENCE     �   CREATE SEQUENCE public.matching_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.matching_id_seq;
       public            
   mirai_user    false    5    229            �           0    0    matching_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.matching_id_seq OWNED BY public.matching.id;
          public            
   mirai_user    false    228            �            1259    21668    missions    TABLE     �  CREATE TABLE public.missions (
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
    DROP TABLE public.missions;
       public         heap r    
   mirai_user    false    898    898    5            �            1259    21667    missions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.missions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.missions_id_seq;
       public            
   mirai_user    false    5    223            �           0    0    missions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.missions_id_seq OWNED BY public.missions.id;
          public            
   mirai_user    false    222            �            1259    21659    profiles    TABLE     �   CREATE TABLE public.profiles (
    id integer NOT NULL,
    user_id integer NOT NULL,
    type public."Role" NOT NULL,
    details jsonb NOT NULL
);
    DROP TABLE public.profiles;
       public         heap r    
   mirai_user    false    5    868            �            1259    21658    profiles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.profiles_id_seq;
       public            
   mirai_user    false    221    5            �           0    0    profiles_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;
          public            
   mirai_user    false    220            �            1259    21715    reviews    TABLE     q  CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer NOT NULL,
    reviewer_id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mission_id integer NOT NULL,
    type public."ReviewType" DEFAULT 'company_to_freelancer'::public."ReviewType" NOT NULL
);
    DROP TABLE public.reviews;
       public         heap r    
   mirai_user    false    910    910    5            �            1259    21714    reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.reviews_id_seq;
       public            
   mirai_user    false    5    231            �           0    0    reviews_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;
          public            
   mirai_user    false    230            �            1259    21688    transactions    TABLE     ,  CREATE TABLE public.transactions (
    id integer NOT NULL,
    mission_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    status public."TransactionStatus" DEFAULT 'pending'::public."TransactionStatus" NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
     DROP TABLE public.transactions;
       public         heap r    
   mirai_user    false    874    5    874            �            1259    21687    transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public            
   mirai_user    false    5    227            �           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public            
   mirai_user    false    226            �            1259    21648    users    TABLE     o  CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'freelancer'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.users;
       public         heap r    
   mirai_user    false    868    868    5            �            1259    21647    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public            
   mirai_user    false    5    219            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public            
   mirai_user    false    218            �           2604    24121    Conversation id    DEFAULT     v   ALTER TABLE ONLY public."Conversation" ALTER COLUMN id SET DEFAULT nextval('public."Conversation_id_seq"'::regclass);
 @   ALTER TABLE public."Conversation" ALTER COLUMN id DROP DEFAULT;
       public            
   mirai_user    false    232    233    233            �           2604    24129 
   Message id    DEFAULT     l   ALTER TABLE ONLY public."Message" ALTER COLUMN id SET DEFAULT nextval('public."Message_id_seq"'::regclass);
 ;   ALTER TABLE public."Message" ALTER COLUMN id DROP DEFAULT;
       public            
   mirai_user    false    234    235    235            �           2604    21682    applications id    DEFAULT     r   ALTER TABLE ONLY public.applications ALTER COLUMN id SET DEFAULT nextval('public.applications_id_seq'::regclass);
 >   ALTER TABLE public.applications ALTER COLUMN id DROP DEFAULT;
       public            
   mirai_user    false    224    225    225            �           2604    21710    matching id    DEFAULT     j   ALTER TABLE ONLY public.matching ALTER COLUMN id SET DEFAULT nextval('public.matching_id_seq'::regclass);
 :   ALTER TABLE public.matching ALTER COLUMN id DROP DEFAULT;
       public            
   mirai_user    false    229    228    229            �           2604    21671    missions id    DEFAULT     j   ALTER TABLE ONLY public.missions ALTER COLUMN id SET DEFAULT nextval('public.missions_id_seq'::regclass);
 :   ALTER TABLE public.missions ALTER COLUMN id DROP DEFAULT;
       public            
   mirai_user    false    223    222    223            �           2604    21662    profiles id    DEFAULT     j   ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);
 :   ALTER TABLE public.profiles ALTER COLUMN id DROP DEFAULT;
       public            
   mirai_user    false    221    220    221            �           2604    21718 
   reviews id    DEFAULT     h   ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);
 9   ALTER TABLE public.reviews ALTER COLUMN id DROP DEFAULT;
       public            
   mirai_user    false    231    230    231            �           2604    21691    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public            
   mirai_user    false    226    227    227            �           2604    21651    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public            
   mirai_user    false    218    219    219            �          0    24118    Conversation 
   TABLE DATA           F   COPY public."Conversation" (id, "createdAt", "updatedAt") FROM stdin;
    public            
   mirai_user    false    233   ��       �          0    24126    Message 
   TABLE DATA           n   COPY public."Message" (id, content, "createdAt", "updatedAt", "senderId", "conversationId", read) FROM stdin;
    public            
   mirai_user    false    235   �       �          0    24136    _ConversationParticipants 
   TABLE DATA           ?   COPY public."_ConversationParticipants" ("A", "B") FROM stdin;
    public            
   mirai_user    false    236   �       �          0    21608    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public            
   mirai_user    false    217   �       �          0    21679    applications 
   TABLE DATA           Y   COPY public.applications (id, mission_id, status, created_at, freelancer_id) FROM stdin;
    public            
   mirai_user    false    225   �       �          0    21707    matching 
   TABLE DATA           P   COPY public.matching (id, user_id, mission_id, score, date_matched) FROM stdin;
    public            
   mirai_user    false    229   *�       �          0    21668    missions 
   TABLE DATA           �   COPY public.missions (id, title, description, budget, status, created_at, category, company_id, "requiredSkills", updated_at) FROM stdin;
    public            
   mirai_user    false    223   G�       �          0    21659    profiles 
   TABLE DATA           >   COPY public.profiles (id, user_id, type, details) FROM stdin;
    public            
   mirai_user    false    221   ��       �          0    21715    reviews 
   TABLE DATA           d   COPY public.reviews (id, user_id, reviewer_id, rating, comment, date, mission_id, type) FROM stdin;
    public            
   mirai_user    false    231   �       �          0    21688    transactions 
   TABLE DATA           L   COPY public.transactions (id, mission_id, amount, status, date) FROM stdin;
    public            
   mirai_user    false    227   ډ       �          0    21648    users 
   TABLE DATA           Z   COPY public.users (id, name, email, password, role, "createdAt", "updatedAt") FROM stdin;
    public            
   mirai_user    false    219   ��       �           0    0    Conversation_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Conversation_id_seq"', 2, true);
          public            
   mirai_user    false    232            �           0    0    Message_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Message_id_seq"', 20, true);
          public            
   mirai_user    false    234            �           0    0    applications_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.applications_id_seq', 13, true);
          public            
   mirai_user    false    224            �           0    0    matching_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.matching_id_seq', 1, false);
          public            
   mirai_user    false    228            �           0    0    missions_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.missions_id_seq', 3, true);
          public            
   mirai_user    false    222            �           0    0    profiles_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.profiles_id_seq', 7, true);
          public            
   mirai_user    false    220            �           0    0    reviews_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.reviews_id_seq', 2, true);
          public            
   mirai_user    false    230            �           0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);
          public            
   mirai_user    false    226            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 7, true);
          public            
   mirai_user    false    218            �           2606    24124    Conversation Conversation_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Conversation" DROP CONSTRAINT "Conversation_pkey";
       public              
   mirai_user    false    233            �           2606    24135    Message Message_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Message" DROP CONSTRAINT "Message_pkey";
       public              
   mirai_user    false    235            �           2606    24140 ;   _ConversationParticipants _ConversationParticipants_AB_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."_ConversationParticipants"
    ADD CONSTRAINT "_ConversationParticipants_AB_pkey" PRIMARY KEY ("A", "B");
 i   ALTER TABLE ONLY public."_ConversationParticipants" DROP CONSTRAINT "_ConversationParticipants_AB_pkey";
       public              
   mirai_user    false    236    236            �           2606    21616 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public              
   mirai_user    false    217            �           2606    21686    applications applications_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.applications DROP CONSTRAINT applications_pkey;
       public              
   mirai_user    false    225            �           2606    21713    matching matching_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.matching
    ADD CONSTRAINT matching_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.matching DROP CONSTRAINT matching_pkey;
       public              
   mirai_user    false    229            �           2606    21677    missions missions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.missions DROP CONSTRAINT missions_pkey;
       public              
   mirai_user    false    223            �           2606    21666    profiles profiles_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.profiles DROP CONSTRAINT profiles_pkey;
       public              
   mirai_user    false    221            �           2606    21723    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public              
   mirai_user    false    231            �           2606    21695    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public              
   mirai_user    false    227            �           2606    21657    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public              
   mirai_user    false    219            �           1259    24141    Message_conversationId_idx    INDEX     ^   CREATE INDEX "Message_conversationId_idx" ON public."Message" USING btree ("conversationId");
 0   DROP INDEX public."Message_conversationId_idx";
       public              
   mirai_user    false    235            �           1259    24142    Message_senderId_idx    INDEX     R   CREATE INDEX "Message_senderId_idx" ON public."Message" USING btree ("senderId");
 *   DROP INDEX public."Message_senderId_idx";
       public              
   mirai_user    false    235            �           1259    24143 !   _ConversationParticipants_B_index    INDEX     j   CREATE INDEX "_ConversationParticipants_B_index" ON public."_ConversationParticipants" USING btree ("B");
 7   DROP INDEX public."_ConversationParticipants_B_index";
       public              
   mirai_user    false    236            �           1259    21725    profiles_user_id_key    INDEX     S   CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id);
 (   DROP INDEX public.profiles_user_id_key;
       public              
   mirai_user    false    221            �           1259    25202 "   reviews_mission_id_reviewer_id_key    INDEX     p   CREATE UNIQUE INDEX reviews_mission_id_reviewer_id_key ON public.reviews USING btree (mission_id, reviewer_id);
 6   DROP INDEX public.reviews_mission_id_reviewer_id_key;
       public              
   mirai_user    false    231    231            �           1259    21726    transactions_mission_id_key    INDEX     a   CREATE UNIQUE INDEX transactions_mission_id_key ON public.transactions USING btree (mission_id);
 /   DROP INDEX public.transactions_mission_id_key;
       public              
   mirai_user    false    227            �           1259    21724    users_email_key    INDEX     I   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
 #   DROP INDEX public.users_email_key;
       public              
   mirai_user    false    219                       2606    24149 #   Message Message_conversationId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public."Conversation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public."Message" DROP CONSTRAINT "Message_conversationId_fkey";
       public            
   mirai_user    false    235    4852    233                       2606    24144    Message Message_senderId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Message" DROP CONSTRAINT "Message_senderId_fkey";
       public            
   mirai_user    false    219    235    4835                       2606    24154 :   _ConversationParticipants _ConversationParticipants_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_ConversationParticipants"
    ADD CONSTRAINT "_ConversationParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES public."Conversation"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 h   ALTER TABLE ONLY public."_ConversationParticipants" DROP CONSTRAINT "_ConversationParticipants_A_fkey";
       public            
   mirai_user    false    4852    233    236            	           2606    24159 :   _ConversationParticipants _ConversationParticipants_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_ConversationParticipants"
    ADD CONSTRAINT "_ConversationParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 h   ALTER TABLE ONLY public."_ConversationParticipants" DROP CONSTRAINT "_ConversationParticipants_B_fkey";
       public            
   mirai_user    false    4835    236    219            �           2606    21815 ,   applications applications_freelancer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_freelancer_id_fkey FOREIGN KEY (freelancer_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.applications DROP CONSTRAINT applications_freelancer_id_fkey;
       public            
   mirai_user    false    225    219    4835            �           2606    21820 )   applications applications_mission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public.applications DROP CONSTRAINT applications_mission_id_fkey;
       public            
   mirai_user    false    4840    223    225                       2606    21767 !   matching matching_mission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.matching
    ADD CONSTRAINT matching_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.matching DROP CONSTRAINT matching_mission_id_fkey;
       public            
   mirai_user    false    4840    223    229                       2606    21762    matching matching_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.matching
    ADD CONSTRAINT matching_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.matching DROP CONSTRAINT matching_user_id_fkey;
       public            
   mirai_user    false    219    4835    229            �           2606    21810 !   missions missions_company_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public.missions DROP CONSTRAINT missions_company_id_fkey;
       public            
   mirai_user    false    223    4835    219            �           2606    21727    profiles profiles_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.profiles DROP CONSTRAINT profiles_user_id_fkey;
       public            
   mirai_user    false    4835    221    219                       2606    25203    reviews reviews_mission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_mission_id_fkey;
       public            
   mirai_user    false    4840    231    223                       2606    21777     reviews reviews_reviewer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_reviewer_id_fkey;
       public            
   mirai_user    false    219    231    4835                       2606    21772    reviews reviews_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
       public            
   mirai_user    false    219    4835    231                        2606    21747 )   transactions transactions_mission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_mission_id_fkey;
       public            
   mirai_user    false    4840    227    223            �   >   x�uɱ�0�:?� =oA�d�9�"�ۻ�D�q�zG=Y^̓C���?�ٷw���8��`      �   �   x�u�MN1���)| Ɗ��f�9�����	n�s�b�2@�}~�����|,���1c뇆��r��������S�מ��s-si��7i3ID��p2���wa�(F%P^V��XP�$��w�_�c�����)���l��&k)
��=E��"�3���/�e,Ɇ$B�l��%mI�Yݢ���a?�&�c9���7K�=�[�)�> ��Us      �      x�3�4�2�4�2�F��\1z\\\ ��      �   �  x����n7���O��B%j�O`!�T�@�^�E߾\�@��M��� 3#�������m��KW�Eu-
c�sfT����2k�
�f�|�	�}Ȭ{��XQ��Zssݐ��@�� j���G�[�j��>�J׃O���������}�
`�}x#Zy{�ݥ��*sw-���t�|:8�:'�4�X��Z�ex�!�]�V�`�`�Ġ�����z��F}#D;�S܍󟧧x8�������AI�����ϲ��"��t�]���X�Z����yN��H�k���UgV�2�ֈ���Ҹ=�s�D��s͏UT �	G�������x8]�I�+�����4OWZ�izI�sKjm���9d�Y��Rv���6�Jǻ�t���á��⽶&^��_P��\����!�>��4'u�k4��Ŷ�"�A��A�mV�Y�up;V׻{'�HǨ1ǘ�]t�hs�&�	Zi�Om�y���B��505��J
�j�5) ��U[i暞,̜w+�$,�t��-j��.��p3�Cl�d����mvϠ�$��?T�'�#��)I��H ��r���r���3ƛ�gH����uI�Xd]�H�ed��_d9|0�Yf��EK�⥫��;[�x�V�:Bֽ���:3W���B
�'����-bWM�!P�֟1���._����"�[���|������[      �   4   x�34�4�LLNN-(IM�4202�50�54R04�2��25�34�4����� ��	%      �      x������ � �      �   b  x����N�0�g�)�.]�(I��n�� ������c[�E��s�Ű(��0�Œ}��}�Ӑ��Fr�h*�
��H{�!�����
|.](�Q߻����c��x�qM��֒�mU�կ��e�TM;�����լ��5my9%_�j�����~�y0l��h����eŔ̷�'P�Z�A'�q�@��
���f�
ȍ�	�
�X�iL&��	x��E��_���YՕ�Π,I��_� ~V2�`|��x� 9b�łm8��&s���7���n��P��!A���?��L�cUR!����aQ����[�I�]����5[b�s6�2�L0��lRW4�N�YS�M�eQ����      �     x��S�r1=o���K/�M�&er�nL������c/��������ȏay��:�lie=����bP��*�!w2���(G�Z.�-�S!�3���+��G ��/�Tu�*G��� țt�^+B�R/�Q���]`.�U�����������
�h��q���Ķg/�Sv��`�O����nʘ�[�7��-X_UP�R	u�� G��������U����|>�Fe�*��w�z�e�]�r�6�:>��T�z��2��p�H���2	p⁐08ER6	pU\=)@��c^�t�)����=d�<R%��f� �R.���B�E�\Ì����ދA��[�$bn-gDU��Dھ8Kg��3u��d�[p��A��_�F����R��D�(��H��R��$�	���v̗$c����YSeǤ�f������A�g�����?�smS�s�wR&����w�c��<A���].�ok�x���`k�a��v��$i���J��F3P�{���H�����D�J��w��u:�_,/�~      �   �   x�U�MN�0�u{
�b�Di�L��Y�b�4�.XJ�⤣�H=G/F"?+K~��WmQ�����{�Q��!,
�������[�H:�#Ϩ�3�G��Y9�L�&� ��E���Nm�z��j�����mv�{�Cgƶ����P>Nq:J�QiY���K&�뼭ʔr��'�'�sZ@���]֍��ØC瑕2oF��+����C�ԝ=���o���+_LY����mw      �      x������ � �      �   m  x���Os�@��ç���	=(�uQ����^Fa@��_j��Lmm��zU��{m 7�2���8�H����//8�j�}�� f~[1.���	|�7`RL�dNݧ��-X��o"��OF�\���e��h�hkz�tU �tlM����b"'\�L&��̊O�@�	:������;�ubO7*]����W�o��	f��a�:�䴑�_*@��:�ře7|�ӈrY����H�k6f���<�?�z`[�����4M�C߼g�������h�l�I���Y��L�H�2>fM���<P��*߻��=���0����&v,�>�&�h'D���7g��	�������`�؝�(���(��-�     