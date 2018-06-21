export default class PollService {
    constructor(resource) {
        this._resource = resource('poll{/id}{?q,p}');
    }

    get(id) {
        return this._resource.get({
            id
        }).then(res => res.json());
    }

    listAll(page, query) {
        return this._resource.query({
            p: page,
            q: query
        }).then(res => res.json());
    }

    save(poll) {
        return this._resource.save(poll);
    }

    edit(id, poll) {
        return this._resource.update({
            id
        }, poll);
    }

    delete(id) {
        return this._resource.delete({
            id
        });
    }
}