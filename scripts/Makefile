# Compiler
CC = gcc

#Compiler flags
CFLAGS = -Wall -Wextra -Ilib

# Source files
SRCS = db.c main.c

# Output executable
TARGET = ajk

# Build target
all: $(TARGET)

$(TARGET): $(SRCS)
	# $(CC) -o $(TARGET) $(SRCS)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRCS)

# Clean target
clean:
	rm -f $(TARGET)
