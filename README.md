Additional Information
----

For deployment to kubernetes clusters we use Helm 3.

For an in depth installation guide you can refer to the [installation guide](INSTALLATION.md).

- [Contributing](CONTRIBUTING.md)

- [ChangeLogs](CHANGELOG.md)

- [RoadMap](ROADMAP.md)

- [Security](SECURITY.md)

- [Licence](LICENSE.md)

Description
----

De Proto Applicatie levert een vooringerichte versie van het Symfony PHP framework waarbij de NL Design System componenten zijn voorzien van template widgets. Oftewel het is mogelijk om vanuit je PHP/HTML templates direct gebruik te maken van NL Design Elementen. De business logica van de Proto Applicatie wordt geleverd door de generieke Common Ground Bundle.  

**Framework**

De Proto Applicatie rust op het PHP Symfony Framework, daarbij importeert het de Common Ground Bundel, die ze als logica gebruikt (voor o.a. de VSBE) en NL Design System voor grafische vormgeving. Er is dus geen sprake van specifiek geschreven code, de applicatie wordt geheel vormgegeven door slim gebruik van dependency management en een klein beetje configuratie met betrekking tot hoe de applicatie zich authenticeert op Common Ground / NLX. 

Het dient dus als een voorbeeld voor de kracht van framework development en dependency management als methodiek, om een volledige applicatie puur te baseren op hergebruik van code en processen. 


**NL Design System**

Tevens is er een widget library beschikbaar voor de Processen Catalogus, dat wil versimpeld zeggen dat er vooringerichte widgets zijn die zijn gekoppeld aan een specifieke (micro) service. Hiermee worden de grafische elementen uit NL Design System geoperationaliseerd.

Voorbeelden hiervan zijn formulier-elementen zoals: ‘adres opgeven’ , die gebruik maakt van de Adressen Service, om aan de hand van een huisnummer- postcode combinatie tot een BAG id te komen. En ‘bedrijf opgeven’ , die aan de hand van een bedrijfsnaam een kvk nummer suggereert. De proto applicatie geeft dus een invulling aan het verbinden van de door NL design ontworpen UI en de door/aan Common Ground geleverde componenten en API’s. 

**Very Small Business Engine**

Onderdeel van de Proto Applicatie is de very small business engine, deze is oorspronkelijk bedacht voor het uitvoeren van simpele processen, maar heeft zich tegenwoordig gespecialiseerd in het ondersteunen van klantreizen. In de Common Ground zin wil dit dus zeggen dat het het Procestypen uit het PTC voorziet van de grafische elementen uit NL Design System (met indien nodig microservices uit het PC) en de resultaten van de klantreis als verzoek opslaat in het VRC. Met andere woorden de Proto Applicatie ondersteunt ‘out of the box’ klantreizen zoals gedefinieerd binnen Common Ground containers.

**Implementaties**

Er zijn momenteel een aantal voorbeeld implementaties van de Proto Applicatie beschikbaar vanuit de Huwelijksplanner, AdreswijzigingNL, Begraafplaatsen Registratie, COVID-19 formulieren, ROC flevoland en Processen.

Tutorial
----

For information on how to work with the component you can refer to the tutorial [here](TUTORIAL.md).

#### Setup your local environment
Before we can spin up our component we must first get a local copy from our repository, we can either do this through the command line or use a Git client. 

For this example we're going to use [GitKraken](https://www.gitkraken.com/) but you can use any tool you like, feel free to skip this part if you are already familiar with setting up a local clone of your repository.

Open gitkraken press "clone a repo" and fill in the form (select where on your local machine you want the repository to be stored, and fill in the link of your repository on github), press "clone a repo" and you should then see GitKraken downloading your code. After it's done press "open now" (in the box on top) and voilá your codebase (you should see an initial commit on a master branch).

You can now navigate to the folder where you just installed your code, it should contain some folders and files and generally look like this. We will get into the files later, lets first spin up our component!

Next make sure you have [docker desktop](https://www.docker.com/products/docker-desktop) running on your computer.

Open a command window (example) and browse to the folder where you just stuffed your code, navigating in a command window is done by cd, so for our example we could type 
cd c:\repos\common-ground\my-component (if you installed your code on a different disk then where the cmd window opens first type <diskname>: for example D: and hit enter to go to that disk, D in this case). We are now in our folder, so let's go! Type docker-compose up and hit enter. From now on whenever we describe a command line command we will document it as follows (the $ isn't actually typed but represents your folder structure):

```CLI
$ docker-compose up
```

Your computer should now start up your local development environment. Don't worry about al the code coming by, let's just wait until it finishes. You're free to watch along and see what exactly docker is doing, you will know when it's finished when it tells you that it is ready to handle connections. 

Open your browser type [<http://localhost/>](https://localhost) as address and hit enter, you should now see your common ground component up and running.


Credits
----

Information about the authors of this component can be found [here](AUTHORS.md)

This component is based on the following [schema.org](https://schema.org) sources:
- [Address](https://schema.org/PostalAddress)
- [Person](https://schema.org/Person)



Copyright © [Conduction](https://www.conduction.nl/) 2019
