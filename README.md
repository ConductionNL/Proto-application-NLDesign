Proto Application NL Design
-------

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

Credits
-------

Created by [Ruben van der Linde](https://www.conduction.nl/team) for conduction. But based on [api platform](https://api-platform.com) by [Kévin Dunglas](https://dunglas.fr). Commercial support for common ground components available from [Conduction](https://www.conduction.nl).
