import BreadcrumbBuilder from "@/components/BreadcrumbBuilder"



export default function FAQ() {

    const breadcrumbs = [
        {href: '/', label: 'Home'},
        {href: '', label: 'FAQ'} // empty string to return breadcrump current page
    ]

    return (
        <div>
            <BreadcrumbBuilder crumbs={breadcrumbs}/>
            <h1>Frequently Asked Questions</h1>
        </div>
    )
}