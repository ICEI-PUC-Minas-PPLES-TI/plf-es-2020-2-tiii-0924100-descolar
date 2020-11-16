-- Table: public.cliente

-- DROP TABLE public.cliente;

CREATE TABLE public.cliente
(
    nome text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    senha text COLLATE pg_catalog."default" NOT NULL,
    cod_cliente integer NOT NULL,
    data_cadastro date NOT NULL,
    cpf integer,
    cnpj integer,
    CONSTRAINT cliente_pkey PRIMARY KEY (cod_cliente),
    CONSTRAINT cliente_cpf_ou_cnpj CHECK (num_nonnulls(cpf, cnpj) = 1)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.cliente
    OWNER to adm;