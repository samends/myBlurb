export function sampleMiddleware(req, res, next) {
    console.log('calls');
    next();
}