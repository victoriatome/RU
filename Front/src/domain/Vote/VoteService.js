export default class VoteService {
    constructor(resource) {
        this._resource = resource('vote{/id}{?q,p}');
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

    save(vote) {
        return this._resource.save(vote);
    }

    edit(id, vote) {
        return this._resource.update({
            id
        }, vote);
    }

    delete(id) {
        return this._resource.delete({
            id
        });
    }
}