export type Post = {
    id: string
    title: {
        rendered: string
    }
    content: {
        rendered: string
    }
    /* _embedded: {
            ['wp:featuredmedia']: string, 
            [0]: number,
            source_url?: string,
            alt_text?: string
    } */
    _embedded: string['']
    meta: {
        _links_to: string
    }
}