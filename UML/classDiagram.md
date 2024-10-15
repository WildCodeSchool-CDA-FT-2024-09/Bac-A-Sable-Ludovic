```mermaid
classDiagram
    Repo: +String id
    Repo: +Int isPrivate
    Repo: +String name
    Repo: +String url
    
    class Language {
      +Int id
      +String label
    }

    class Status {
      +Int id
      +String label
    }
    
    Repo --> Status : has
    Repo --> Language : has many
