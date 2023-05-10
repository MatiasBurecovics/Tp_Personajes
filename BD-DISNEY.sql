USE [master]
GO
/****** Object:  Database [Disney]    Script Date: 10/5/2023 08:49:53 ******/
CREATE DATABASE [Disney]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Disney', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Disney.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Disney_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Disney_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Disney] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Disney].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Disney] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Disney] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Disney] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Disney] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Disney] SET ARITHABORT OFF 
GO
ALTER DATABASE [Disney] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Disney] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Disney] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Disney] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Disney] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Disney] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Disney] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Disney] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Disney] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Disney] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Disney] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Disney] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Disney] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Disney] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Disney] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Disney] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Disney] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Disney] SET RECOVERY FULL 
GO
ALTER DATABASE [Disney] SET  MULTI_USER 
GO
ALTER DATABASE [Disney] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Disney] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Disney] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Disney] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Disney] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Disney', N'ON'
GO
ALTER DATABASE [Disney] SET QUERY_STORE = OFF
GO
USE [Disney]
GO
/****** Object:  User [Disney]    Script Date: 10/5/2023 08:49:53 ******/
CREATE USER [Disney] FOR LOGIN [Disney] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 10/5/2023 08:49:53 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Disney]
GO
/****** Object:  Table [dbo].[PeliculaOSerie]    Script Date: 10/5/2023 08:49:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PeliculaOSerie](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](255) NOT NULL,
	[Titulo] [varchar](255) NOT NULL,
	[Fecha_de_creacion] [date] NOT NULL,
	[Calificacion] [float] NOT NULL,
 CONSTRAINT [PK__Pelicula__3214EC077CCB8AE8] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personaje]    Script Date: 10/5/2023 08:49:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personaje](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](max) NOT NULL,
	[Nombre] [varchar](255) NOT NULL,
	[Edad] [int] NOT NULL,
	[Peso] [float] NOT NULL,
	[Historia] [text] NOT NULL,
 CONSTRAINT [PK__Personaj__3214EC0732AA9C17] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personaje_Pelicula]    Script Date: 10/5/2023 08:49:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personaje_Pelicula](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Id_Personaje] [int] NOT NULL,
	[Id_PeliculaOSerie] [int] NOT NULL,
 CONSTRAINT [PK__Personaj__3214EC0731931B5F] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[PeliculaOSerie] ON 

INSERT [dbo].[PeliculaOSerie] ([Id], [Imagen], [Titulo], [Fecha_de_creacion], [Calificacion]) VALUES (1, N'https://pics.filmaffinity.com/Fantas_a-929802744-mmed.jpg', N'Fantasia', CAST(N'1940-12-25' AS Date), 3)
INSERT [dbo].[PeliculaOSerie] ([Id], [Imagen], [Titulo], [Fecha_de_creacion], [Calificacion]) VALUES (8, N'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/caballero-luna-poster-fotogramas-1646305531.jpg?resize=480:*', N'Moonknight', CAST(N'2022-03-30' AS Date), 3)
INSERT [dbo].[PeliculaOSerie] ([Id], [Imagen], [Titulo], [Fecha_de_creacion], [Calificacion]) VALUES (23, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HWx7MTmKYHcDR9M3SJVbue5UIWJCPYe68A&usqp=CAU', N'Blancanieves y los siete enanos', CAST(N'1937-12-21' AS Date), 4)
INSERT [dbo].[PeliculaOSerie] ([Id], [Imagen], [Titulo], [Fecha_de_creacion], [Calificacion]) VALUES (24, N'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/4QU5SYV7CREFBGFOT5ZTYNBDEM.jpeg', N'Loki', CAST(N'2021-06-09' AS Date), 4)
INSERT [dbo].[PeliculaOSerie] ([Id], [Imagen], [Titulo], [Fecha_de_creacion], [Calificacion]) VALUES (25, N'https://c8.alamy.com/compes/e5menb/a-goofy-movie-nosotros-poster-desde-la-izquierda-max-goofy-1995-walt-disney-pictures-cortesia-coleccion-everett-e5menb.jpg', N' A Goofy movie', CAST(N'1995-04-07' AS Date), 2)
INSERT [dbo].[PeliculaOSerie] ([Id], [Imagen], [Titulo], [Fecha_de_creacion], [Calificacion]) VALUES (26, N'https://static.wikia.nocookie.net/doblaje/images/0/03/MiraculousLasAventurasdeLadybug.jpg/revision/latest?cb=20220312194756&path-prefix=es', N'Miraculous: Las aventuras de Ladybug', CAST(N'2015-09-01' AS Date), 3)
SET IDENTITY_INSERT [dbo].[PeliculaOSerie] OFF
GO
SET IDENTITY_INSERT [dbo].[Personaje] ON 

INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (1, N'https://vignette.wikia.nocookie.net/disney/images/e/ee/Mickey_Mouse_Transparent.png/revision/latest?cb=20210222224826', N'Mickey Mouse', 60, 35.3, N'Mickey es un ratón divertido y amigable que siempre está listo para la aventura.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (2, N'data:image/jpeg;base64,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', N'Moonknight', 36, 102, N'Un trabajador de un museo que lucha contra un trastorno de identidad disociativo, recibe los poderes de un dios egipcio de la luna. Pronto descubre que estos poderes pueden ser tanto una bendición como una maldición. 50 min.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (3, N'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/SNOW_WHITE_DISNEY.jpg/320px-SNOW_WHITE_DISNEY.jpg', N'Blanca Nieves', 14, 40, N'una princesa bonita, encantadora, dulce y adolescente llamada Blancanieves conoce a un grupo de siete enanitos cuando huye de su malvada madrastra, la Reina Grimhilde, que ha ordenado matarla para ser más bella del reino.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (4, N'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Tom_Hiddleston_by_Gage_Skidmore.jpg/190px-Tom_Hiddleston_by_Gage_Skidmore.jpg', N'Loki', 5000, 238, N'Loki nació como un Gigante de Hielo y fue abandonado de niño por su padre Laufey, solo para ser encontrado por Odín tras frenar la invasión del reino de los Gigantes de Hielo de Jotunheim. Odín usó magia para hacer que Loki pareciera asgardiano y lo crio como un hijo junto a su primogénito biológico, Thor.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (5, N'https://vignette.wikia.nocookie.net/disney/images/5/5c/Goofy_Transparent.png/revision/latest?cb=20210222230855', N'Goofy', 68, 79.4, N'Goofy es un perro torpe pero divertido que siempre está dispuesto a hacer reír a sus amigos.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (6, N'https://pm1.narvii.com/6219/d9f5b1100513cc9b7907ac59182b8a0601452089_00.jpg', N'Marinette Dupain-Cheng', 13, 34, N'Marinette Dupain-Cheng es una chica adolescente que fue escogida por el maestro Fu para portar el Miraculous de la Mariquita y convertirse en la superheroína Ladybug. Al principio, ella es reacia al trabajo, pero gradualmente se adapta al rol.')
SET IDENTITY_INSERT [dbo].[Personaje] OFF
GO
SET IDENTITY_INSERT [dbo].[Personaje_Pelicula] ON 

INSERT [dbo].[Personaje_Pelicula] ([Id], [Id_Personaje], [Id_PeliculaOSerie]) VALUES (1, 1, 1)
INSERT [dbo].[Personaje_Pelicula] ([Id], [Id_Personaje], [Id_PeliculaOSerie]) VALUES (2, 2, 8)
INSERT [dbo].[Personaje_Pelicula] ([Id], [Id_Personaje], [Id_PeliculaOSerie]) VALUES (3, 3, 23)
INSERT [dbo].[Personaje_Pelicula] ([Id], [Id_Personaje], [Id_PeliculaOSerie]) VALUES (4, 4, 24)
INSERT [dbo].[Personaje_Pelicula] ([Id], [Id_Personaje], [Id_PeliculaOSerie]) VALUES (5, 5, 25)
INSERT [dbo].[Personaje_Pelicula] ([Id], [Id_Personaje], [Id_PeliculaOSerie]) VALUES (6, 6, 26)
SET IDENTITY_INSERT [dbo].[Personaje_Pelicula] OFF
GO
ALTER TABLE [dbo].[Personaje_Pelicula]  WITH CHECK ADD  CONSTRAINT [FK__Personaje__Id_Pe__4222D4EF] FOREIGN KEY([Id_Personaje])
REFERENCES [dbo].[Personaje] ([Id])
GO
ALTER TABLE [dbo].[Personaje_Pelicula] CHECK CONSTRAINT [FK__Personaje__Id_Pe__4222D4EF]
GO
ALTER TABLE [dbo].[Personaje_Pelicula]  WITH CHECK ADD  CONSTRAINT [FK__Personaje__Id_Pe__4316F928] FOREIGN KEY([Id_PeliculaOSerie])
REFERENCES [dbo].[PeliculaOSerie] ([Id])
GO
ALTER TABLE [dbo].[Personaje_Pelicula] CHECK CONSTRAINT [FK__Personaje__Id_Pe__4316F928]
GO
USE [master]
GO
ALTER DATABASE [Disney] SET  READ_WRITE 
GO
