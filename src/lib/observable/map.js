import Observable from './index';

class MapObserver {
    constructor(subscriber, mapper) {
        this.mapper = mapper;
        this.subscriber = subscriber;

        this._index = 0;
    }

    next(item) {
        if (this.subscriber.closed) {
            return
        }

        try {
            this.subscriber.next(
                this.mapper(item, this._index++)
            );
        }
        catch (e) {
            this.error(e);
        }
    }

    error() {
        this.subscriber.error(...arguments);
    }

    complete() {
        this.subscriber.complete(...arguments);
    }
}

function mapObservable(observable, mapper) {
    return new Observable(
        subscriber =>
            observable
                .subscribe(new MapObserver(subscriber, mapper))
    );
}

function method(mapper) {
    return mapObservable(this, mapper);
}

export {
    mapObservable as default,
    method
}
