--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11
-- Dumped by pg_dump version 13.0

-- Started on 2020-12-13 17:57:42 -03

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: azure_superuser
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO azure_superuser;

--
-- TOC entry 4281 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: azure_superuser
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 631 (class 1247 OID 34518)
-- Name: conservacao; Type: TYPE; Schema: public; Owner: adm
--

CREATE TYPE public.conservacao AS ENUM (
    'novo',
    'semi-novo',
    'usado'
);


ALTER TYPE public.conservacao OWNER TO adm;

--
-- TOC entry 627 (class 1247 OID 34482)
-- Name: status; Type: TYPE; Schema: public; Owner: adm
--

CREATE TYPE public.status AS ENUM (
    'disponivel',
    'doado',
    'aguardando'
);


ALTER TYPE public.status OWNER TO adm;

--
-- TOC entry 203 (class 1259 OID 22048)
-- Name: cod_cliente_seq; Type: SEQUENCE; Schema: public; Owner: adm
--

CREATE SEQUENCE public.cod_cliente_seq
    START WITH 3
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cod_cliente_seq OWNER TO adm;

SET default_tablespace = '';

--
-- TOC entry 200 (class 1259 OID 16886)
-- Name: cliente; Type: TABLE; Schema: public; Owner: adm
--

CREATE TABLE public.cliente (
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL,
    cod_cliente integer DEFAULT nextval('public.cod_cliente_seq'::regclass) NOT NULL,
    data_cadastro date DEFAULT CURRENT_DATE NOT NULL,
    cpf text,
    cnpj text,
    CONSTRAINT cliente_cpf_ou_cnpj CHECK ((num_nonnulls(cpf, cnpj) = 1))
);


ALTER TABLE public.cliente OWNER TO adm;

--
-- TOC entry 207 (class 1259 OID 28020)
-- Name: demanda_seq; Type: SEQUENCE; Schema: public; Owner: adm
--

CREATE SEQUENCE public.demanda_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.demanda_seq OWNER TO adm;

--
-- TOC entry 201 (class 1259 OID 16900)
-- Name: demanda; Type: TABLE; Schema: public; Owner: adm
--

CREATE TABLE public.demanda (
    cod_demanda integer DEFAULT nextval('public.demanda_seq'::regclass) NOT NULL,
    cod_cliente integer NOT NULL,
    tipo_demanda text NOT NULL,
    nome_demanda text NOT NULL,
    estado_conservacao public.conservacao,
    autor text,
    edicao_anofabric text,
    editora text,
    data_cadastro date DEFAULT now() NOT NULL,
    status public.status DEFAULT 'disponivel'::public.status NOT NULL,
    foto text
);


ALTER TABLE public.demanda OWNER TO adm;

--
-- TOC entry 209 (class 1259 OID 28028)
-- Name: doacao_seq; Type: SEQUENCE; Schema: public; Owner: adm
--

CREATE SEQUENCE public.doacao_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.doacao_seq OWNER TO adm;

--
-- TOC entry 205 (class 1259 OID 27981)
-- Name: doacao_ocorrida; Type: TABLE; Schema: public; Owner: adm
--

CREATE TABLE public.doacao_ocorrida (
    cod_doacao integer DEFAULT nextval('public.doacao_seq'::regclass) NOT NULL,
    confirm_recebimento boolean DEFAULT false NOT NULL,
    cod_cliente_doador integer NOT NULL,
    cod_cliente_recebedor integer NOT NULL,
    cod_material integer,
    cod_demanda integer
);


ALTER TABLE public.doacao_ocorrida OWNER TO adm;

--
-- TOC entry 202 (class 1259 OID 17382)
-- Name: endereco; Type: TABLE; Schema: public; Owner: adm
--

CREATE TABLE public.endereco (
    cod_cliente integer NOT NULL,
    logradouro text NOT NULL,
    numero integer NOT NULL,
    bairro text NOT NULL,
    cidade text NOT NULL,
    estado text NOT NULL,
    complemento text,
    cep text
);


ALTER TABLE public.endereco OWNER TO adm;

--
-- TOC entry 208 (class 1259 OID 28023)
-- Name: material_seq; Type: SEQUENCE; Schema: public; Owner: adm
--

CREATE SEQUENCE public.material_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.material_seq OWNER TO adm;

--
-- TOC entry 206 (class 1259 OID 28003)
-- Name: material; Type: TABLE; Schema: public; Owner: adm
--

CREATE TABLE public.material (
    cod_material integer DEFAULT nextval('public.material_seq'::regclass) NOT NULL,
    data_cadastro date DEFAULT now(),
    tipo text,
    nome_material text,
    estado_conservacao text,
    autor text,
    ano_fabricacao integer,
    editora text,
    cod_cliente integer,
    status public.status DEFAULT 'disponivel'::public.status NOT NULL,
    foto text
);


ALTER TABLE public.material OWNER TO adm;

--
-- TOC entry 204 (class 1259 OID 22853)
-- Name: token; Type: TABLE; Schema: public; Owner: adm
--

CREATE TABLE public.token (
    token text NOT NULL,
    cod_cliente integer NOT NULL
);


ALTER TABLE public.token OWNER TO adm;

--
-- TOC entry 4134 (class 2606 OID 16893)
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (cod_cliente);


--
-- TOC entry 4136 (class 2606 OID 16907)
-- Name: demanda demanda_material_pkey; Type: CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.demanda
    ADD CONSTRAINT demanda_material_pkey PRIMARY KEY (cod_demanda);


--
-- TOC entry 4142 (class 2606 OID 27988)
-- Name: doacao_ocorrida doacao_ocorrida_pkey; Type: CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.doacao_ocorrida
    ADD CONSTRAINT doacao_ocorrida_pkey PRIMARY KEY (cod_doacao);


--
-- TOC entry 4138 (class 2606 OID 17389)
-- Name: endereco endereco_pkey; Type: CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT endereco_pkey PRIMARY KEY (cod_cliente);


--
-- TOC entry 4144 (class 2606 OID 28010)
-- Name: material material_pkey; Type: CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.material
    ADD CONSTRAINT material_pkey PRIMARY KEY (cod_material);


--
-- TOC entry 4124 (class 2606 OID 22812)
-- Name: cliente senha_min; Type: CHECK CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE public.cliente
    ADD CONSTRAINT senha_min CHECK ((length(senha) > 3)) NOT VALID;


--
-- TOC entry 4140 (class 2606 OID 22860)
-- Name: token token_pkey; Type: CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT token_pkey PRIMARY KEY (token);


--
-- TOC entry 4146 (class 2606 OID 21893)
-- Name: endereco FK_cod_cliente; Type: FK CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT "FK_cod_cliente" FOREIGN KEY (cod_cliente) REFERENCES public.cliente(cod_cliente) NOT VALID;


--
-- TOC entry 4152 (class 2606 OID 28011)
-- Name: material cod_cliente_FK; Type: FK CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.material
    ADD CONSTRAINT "cod_cliente_FK" FOREIGN KEY (cod_cliente) REFERENCES public.cliente(cod_cliente);


--
-- TOC entry 4147 (class 2606 OID 22861)
-- Name: token cod_cliente_fk; Type: FK CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT cod_cliente_fk FOREIGN KEY (cod_cliente) REFERENCES public.cliente(cod_cliente);


--
-- TOC entry 4151 (class 2606 OID 40467)
-- Name: doacao_ocorrida demanda_fk; Type: FK CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.doacao_ocorrida
    ADD CONSTRAINT demanda_fk FOREIGN KEY (cod_demanda) REFERENCES public.demanda(cod_demanda) NOT VALID;


--
-- TOC entry 4148 (class 2606 OID 40452)
-- Name: doacao_ocorrida doador_fk; Type: FK CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.doacao_ocorrida
    ADD CONSTRAINT doador_fk FOREIGN KEY (cod_cliente_doador) REFERENCES public.cliente(cod_cliente) NOT VALID;


--
-- TOC entry 4145 (class 2606 OID 16908)
-- Name: demanda fk_cadastrodemandacliente; Type: FK CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.demanda
    ADD CONSTRAINT fk_cadastrodemandacliente FOREIGN KEY (cod_cliente) REFERENCES public.cliente(cod_cliente);


--
-- TOC entry 4150 (class 2606 OID 40462)
-- Name: doacao_ocorrida material_fk; Type: FK CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.doacao_ocorrida
    ADD CONSTRAINT material_fk FOREIGN KEY (cod_material) REFERENCES public.material(cod_material) NOT VALID;


--
-- TOC entry 4149 (class 2606 OID 40457)
-- Name: doacao_ocorrida recebedor_fk; Type: FK CONSTRAINT; Schema: public; Owner: adm
--

ALTER TABLE ONLY public.doacao_ocorrida
    ADD CONSTRAINT recebedor_fk FOREIGN KEY (cod_cliente_recebedor) REFERENCES public.cliente(cod_cliente) NOT VALID;


-- Completed on 2020-12-13 17:58:10 -03

--
-- PostgreSQL database dump complete
--

