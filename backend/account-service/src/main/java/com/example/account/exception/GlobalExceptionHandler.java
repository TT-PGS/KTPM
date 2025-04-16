package com.example.account.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAllExceptions(Exception ex) {
        ex.printStackTrace(); // Log chi tiết
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Server error", ex.getMessage()));
    }

    static class ErrorResponse {
        public String error;
        public String message;

        public ErrorResponse(String error, String message) {
            this.error = error;
            this.message = message;
        }
    }
}
