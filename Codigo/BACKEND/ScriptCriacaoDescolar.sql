-- criação da tabela cliente
CREATE TABLE [dbo].[Cliente](
	[Cod_Cliente] [int] NOT NULL,
	[Nome] [char](40) NOT NULL,
	[Email] [char](25) NOT NULL,
	[Senha] [varbinary](1) NOT NULL,
	[Data_Cadastro] [int] NOT NULL,
	[CPF] [int] NULL,
	[CNPJ] [int] NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[Cod_Cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_CNPJ] UNIQUE NONCLUSTERED 
(
	[CNPJ] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_CPF] UNIQUE NONCLUSTERED 
(
	[CPF] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ_Email] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


-- criação da tabela endereço com chave primária e estrangeira cod_cliente da tabela Cliente
CREATE TABLE [dbo].[Endereco](
	[Cod_Cliente] [int] NOT NULL,
	[Logradouro] [varchar](1) NOT NULL,
	[Numero] [int] NOT NULL,
	[Apto] [int] NULL,
	[Bairro] [char](30) NOT NULL,
	[CEP] [int] NOT NULL,
	[Cidade] [char](20) NULL,
	[Estado] [char](20) NULL,
 CONSTRAINT [PK_Endereco] PRIMARY KEY CLUSTERED 
(
	[Cod_Cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[Endereco]  
WITH CHECK ADD  CONSTRAINT [FK_Cod_Cliente] FOREIGN KEY([Cod_Cliente])
REFERENCES [dbo].[Cliente] ([Cod_Cliente])


ALTER TABLE [dbo].[Endereco]
CHECK CONSTRAINT [FK_Cod_Cliente]

-- criação tabela de materias de doação, chave primária cod_material e fk cod_cliente
CREATE TABLE [dbo].[MatDoacao](
	[Cod_Material] [int] NOT NULL,
	CONSTRAINT PK_Cod_Material PRIMARY  KEY (Cod_Material),
	[Data_Cadastro] [date] NOT NULL,
	[Tipo] [nchar](20) NOT NULL,
	[Nome_Material] [nvarchar](50) NOT NULL,
	[Estado_Conservacao] [nchar](20) NULL,
	[Autor] [nvarchar](50) NULL,
	[Estado_Material] [nchar](10) NOT NULL,
	[Edicao_anoFabricacao] [int] NULL,
	[Editoria] [nchar](20) NULL,
	[Foto_Material] [image] NULL,
	[Cod_Cliente] [int] NOT NULL,
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

ALTER TABLE [dbo].[MatDoacao]  
WITH CHECK ADD  CONSTRAINT [FK_Cod_Cliente_doacao] FOREIGN KEY([Cod_Cliente])
REFERENCES [dbo].[Cliente] ([Cod_Cliente])

ALTER TABLE [dbo].[MatDoacao]
CHECK CONSTRAINT [FK_Cod_Cliente_doacao]

--criação da tabela de demanda por material, chave primaria cod_demanda e chave estrangeira cod_cliente
CREATE TABLE [dbo].[MatDemanda](
	[Cod_demanda] [int] NOT NULL,
	CONSTRAINT PK_Cod_demanda PRIMARY KEY (Cod_demanda),
	[Cod_cliente] [int] NOT NULL,
	[Nome_material] [nvarchar](50) NOT NULL,
	[Tipo] [nchar](20) NOT NULL,
	[Estado_conservacao] [nchar](10) NOT NULL,
	[Autor] [nchar](20) NULL,
	[Estado_material] [nchar](10) NOT NULL,
	[Edicao_anoFabric] [int] NULL,
	[Urgencia] [nchar](10) NULL,
	[Editora] [nchar](20) NULL,
	[Data_cadastro] [date] NOT NULL
) ON [PRIMARY]

ALTER TABLE [dbo].[MatDemanda]  
WITH CHECK ADD  CONSTRAINT [FK_Cod_Cliente_demanda] FOREIGN KEY([Cod_Cliente])
REFERENCES [dbo].[Cliente] ([Cod_Cliente])


ALTER TABLE [dbo].[MatDemanda]
CHECK CONSTRAINT [FK_Cod_Cliente_demanda]

--criação tabela match primary key cod match, foreign key cods dos clientes envolvidos
CREATE TABLE [dbo].[Encontro](
	[Data_Match] [date] NOT NULL,
	[Estado_Match] [nchar](10) NOT NULL,
	[Cod_cliente_doador] [int] NOT NULL,
	[Cod_cliente_recebedor] [int] NOT NULL,
	[Cod_match] [int] NOT NULL,
	CONSTRAINT PK_Cod_match PRIMARY KEY (Cod_match),
) ON [PRIMARY]

ALTER TABLE [dbo].[Encontro]  
WITH CHECK ADD  CONSTRAINT [FK_Cod_Cliente_doador] FOREIGN KEY([Cod_Cliente_doador])
REFERENCES [dbo].[Cliente] ([Cod_Cliente])

ALTER TABLE [dbo].[Encontro]
CHECK CONSTRAINT [FK_Cod_Cliente_doador]

ALTER TABLE [dbo].[Encontro]  
WITH CHECK ADD  CONSTRAINT [FK_Cod_Cliente_recebedor] FOREIGN KEY([Cod_Cliente_recebedor])
REFERENCES [dbo].[Cliente] ([Cod_Cliente])

ALTER TABLE [dbo].[Encontro]
CHECK CONSTRAINT [FK_Cod_Cliente_recebedor]

--criação da tabela da doação ocorrida
CREATE TABLE [dbo].[Doacao_ocorrida](
	[Cod_doacao] [int] NOT NULL,
	CONSTRAINT PK_Cod_doacao PRIMARY KEY (Cod_doacao),
	[Cod_rastreio] [int] NULL,
	[Forma_entrega] [nchar](20) NOT NULL,
	[Data_postagem_entrega] [date] NOT NULL,
	[Confirmacao_recebimento] [nchar](10) NOT NULL,
	[Cod_match] [int] NOT NULL
) ON [PRIMARY]

ALTER TABLE [dbo].[Doacao_ocorrida]  
WITH CHECK ADD  CONSTRAINT [FK_Cod_match_doacao] FOREIGN KEY([Cod_match])
REFERENCES [dbo].[Encontro] ([Cod_match])

ALTER TABLE [dbo].[Doacao_ocorrida]
CHECK CONSTRAINT [FK_Cod_match_doacao]



