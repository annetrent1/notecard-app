CREATE TABLE public.user (
	userID BIGSERIAL NOT NULL PRIMARY KEY,	
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	CONSTRAINT uk_email UNIQUE (email)
);
  
CREATE TABLE public.stack (
    stackID BIGSERIAL NOT NULL PRIMARY KEY, 
    userID BIGINT NOT NULL REFERENCES public.user(userID),
    name VARCHAR(50) NOT NULL
);

CREATE TABLE public.notecard (
    notecardID BIGSERIAL NOT NULL PRIMARY KEY, 
    stackID BIGINT NOT NULL REFERENCES public.stack(stackID),
    titleFront VARCHAR(50),
    descriptionFront VARCHAR(3000) NOT NULL,
    titleBack VARCHAR(50),
    descriptionBack VARCHAR(3000) NOT NULL
);

INSERT INTO public.user (firstName, lastName, email, password)
VALUES ('Anne', 'Trent', 'anne@anne.com', 'pass'),
('Nate', 'Gillis', 'nate@email.com', '1234');

INSERT INTO public.stack (userID, name)
VALUES ( ( SELECT userID FROM public.user 
    WHERE firstName='Anne' AND lastName='Trent')
    , 'DNA' ),
    (( SELECT userID FROM public.user 
    WHERE firstName='Anne' AND lastName='Trent')
    , 'SE III' ),
    ( (SELECT userID FROM public.user 
    WHERE firstName='Nate' AND lastName='Gillis')
    , 'Philosophy' );

INSERT INTO public.notecard (stackID, titleFront, descriptionFront, titleBack, descriptionBack)
VALUES ( ( SELECT stackID FROM public.stack 
    WHERE name='DNA')
    , 'Chromosomes'
    , 'Genes'
    , 'Definition'
    , 'Short sequences of DNA that carry sequence information to create the proteins needed by the cell.' ),
    ( ( SELECT stackID FROM public.stack 
    WHERE name='DNA')
    , 'Chromosomes'
    , 'Intron'
    , 'Definition'
    , 'part removed before reading what protein to make' ),
    ( ( SELECT stackID FROM public.stack 
    WHERE name='DNA')
    , 'Chromosomes'
    , 'Exons'
    , 'Definition'
    , 'Spliced parts that are sent off to make the proteins, they are the expressed parts.' ),
    ( ( SELECT stackID FROM public.stack 
    WHERE name='DNA')
    , 'Chromosomes'
    , 'Centromere '
    , 'Definition'
    , ' pinched region on chromosomes'),
    ( ( SELECT stackID FROM public.stack 
    WHERE name='DNA')
    , 'Chromosomes'
    , 'Diploid '
    , 'Definition'
    , ' Cells that contain to sets of chromosomes: 2n.' ),
    ( ( SELECT stackID FROM public.stack 
    WHERE name='DNA')
    , 'Chromosomes'
    , 'Haploid '
    , 'Definition'
    , ' Cell with one set of chromosomes, ants have them.' ),
     ( ( SELECT stackID FROM public.stack 
    WHERE name='SE III')
    , 'Software Models'
    , 'Waterfall '
    , 'Definition'
    , 'requirement gathering and analysis phase, software design, programmed implementation and testing, maintenance.' ),
     ( ( SELECT stackID FROM public.stack 
    WHERE name='SE III')
    , 'Software Models'
    , 'Agile  '
    , 'Definition'
    , ' iterative and incremental' );


    INSERT INTO public.notecard (stackID, descriptionFront, descriptionBack)
    VALUES ( ( SELECT stackID FROM public.stack 
    WHERE name='Philosophy')
    , 'Stoicism '
    , 'the endurance of pain or hardship without the display of feelings and without complaint.' ),
     ( ( SELECT stackID FROM public.stack 
    WHERE name='Philosophy')
    , 'Totalitarianism '
    , 'a system of government that is centralized and dictatorial and requires complete subservience to the state.' ),
     ( ( SELECT stackID FROM public.stack 
    WHERE name='Philosophy')
    , 'Aristotelianism'
    , 'relating to Aristotle or his philosophy.' );

