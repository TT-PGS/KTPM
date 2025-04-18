package com.example.react.entity;

import java.io.Serializable;
import java.util.Objects;

public class ReactId implements Serializable {
    private String userId;
    private String messageId;

    // Constructors
    public ReactId() {
    }

    public ReactId(String userId, String messageId) {
        this.userId = userId;
        this.messageId = messageId;
    }

    // equals & hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof ReactId))
            return false;
        ReactId that = (ReactId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(messageId, that.messageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, messageId);
    }
}
