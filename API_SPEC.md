# Main Search/List endpoint:

Request in GET query:

```
  query: string;
  page: number;
  perPage: number;
```

Response

```
  {
    total: number;
    companies: Array<{
      id: string | number;
      position: number;
      name: string;
      logo: string;
      commits: number;
      country: string;
      website: string;
      github: string;
    }>
  }
```

# Company Details

Request in GET query:

```
  id: string
```

Response

```
  {
    id: string | number;
    position: number;
    name: string;
    logo: string;
    commits: number;
    country: string;
    website: string;
    github: string;
    repos: Array<{
      name: string;
      url: string;
      stars: number;
      commits: number;
      description: string;
    }>
  }
```
