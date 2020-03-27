export { };
declare global {
    interface String {
        toSeoString(): string;
        toApiString(): string;
    }
}

String.prototype.toSeoString = function (this: string): string {
    var input = this;
    input = input.replace(/\s+/g, '-').toLowerCase();
    return input;
}
String.prototype.toApiString = function (this: string): string {
    var input = this;
    input = input.replace('-',' ');
    return input;
}
