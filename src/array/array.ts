interface MyArray<T> {
    length: number
    [index: number]: T
    at(index: number): T | undefined
    unshift(...items: T[]): number
    push(item: T): number
    pop(): T | undefined
    shift(): T | undefined
    every(predicate: (item: T, index: number, arr: MyArray<T>) => unknown): boolean
    map<K>(cb: (item: T, index: number, arr: MyArray<T>) => K): MyArray<K>
    filter(predicate: (item: T, index: number, arr: MyArray<T>) => boolean): MyArray<T>
    includes(searchElement: T, fromIndex?: number): boolean
}

function MyArray<T extends unknown[]>(this: MyArray<T[number]>, ...args: T): MyArray<T[number]> {
    for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
    }
    this.length = args.length;
    return this
}

MyArray.prototype.constructor = MyArray

MyArray.prototype.unshift = function<T>(this: MyArray<T>, ...newItems: T[]): number {
    for (let i = this.length - 1; i >= 0; i--) {
        this[i + newItems.length] = this[i]
    }

    for (let i = 0; i < newItems.length; i++) {
        this[i] = newItems[i];
        this.length++;
    }

    return this.length;
}

MyArray.prototype.push = function<T>(this: MyArray<T>, ...newItems: T[]): number {
    for (let i = 0; i < newItems.length; i++) {
        this[this.length++] = newItems[i];
    }

    return this.length;
}

MyArray.prototype.pop = function<T>(this: MyArray<T>): T | undefined {
    const lastItem = this[this.length];

    if (!lastItem) {
        return undefined;
    }

    delete this[this.length - 1];
    this.length--;

    return lastItem;
}

MyArray.prototype.shift = function<T>(this: MyArray<T>): T | undefined {
    const firstItem = this[0];

    if (!firstItem) {
        return undefined;
    }

    delete this[0];
    this.length--;

    return firstItem;
}

MyArray.prototype.at = function<T>(this: MyArray<T>, index: number): T | undefined {
    return this[index < 0 ? this.length + index : index];
}

MyArray.prototype.every = function<T>(this: MyArray<T>, predicate: (item: T, index: number, arr: MyArray<T>) => unknown): boolean {
    for (let i = 0; i < this.length; i++) {
        if (!predicate(this[i], i , this)) {
            return false
        }
    }

    return true
}

MyArray.prototype.map = function<K, T>(this: MyArray<T>, cb: (item: T, index: number, arr: MyArray<T>) => K): K[] {
    const result: K[] = []

    for (let i = 0; i < this.length; i++) {
        result.push(cb(this[i], i, this))
    }

    return result
}

MyArray.prototype.filter = function<T>(this: MyArray<T>, cb: (item: T, index: number, arr: MyArray<T>) => boolean): MyArray<T> {
    const result: MyArray<T> = []

    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            result.push(this[i])
        }
    }

    return result
}

MyArray.prototype.includes = function<T>(this: MyArray<T>, searchElement: T, fromIndex: number = 0): boolean {
    for (let i = fromIndex; i < this.length; i++) {
        if (this[i] === searchElement) {
            return true
        }
    }

    return false
}

export default MyArray as unknown as {
    new <T extends unknown[]>(...args: T): MyArray<T[number]>;
};