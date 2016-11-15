export class ProjectModel{
    title: string;
    projectid: number;
    year: number;
    tasks: Object;
    tickets: Object;
    owner: string;
    coowner: string;
    team: string[];
    description: string;
}
export class TicketListModel{
    title: string;
    projectid: number;
    modules: Object;
    tickets: Object;
    owner: Object;
    tags:Object;
    coowner: string;
}
export class TicketDetailsModel{
    title: string;
    ticketid: string;
    createddate: string;
    modifiedddate: string;
    assignedto: string;
    status: string;
    type: string;
    priority: string;
    project: Object;
    createdby: Object;
    watchers: Object;
    attachments: Object;
    subtickets: Object;
    comments: Object;
    tags:Object;
    description: string;
}