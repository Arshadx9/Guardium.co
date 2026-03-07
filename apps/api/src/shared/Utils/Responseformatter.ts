class ResponseFormatter {
    static success(data: any, message: string) {
        return {
            success: true,
            message: message,
            data: data
        }
    }

    static error(message: string, data: any = null) {
        return {
            success: false,
            message: message,
            data: data
        }
    }
}

export default ResponseFormatter