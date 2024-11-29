# Compiler
CC = gcc

# Compiler flags
CFLAGS = -Wall -Wextra -Ilib

# Source files
SRCS = main.c

# Output executable
TARGET = ajk.o

# Build target
all: $(TARGET)

$(TARGET): $(SRCS)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRCS)

# Clean target
clean:
	rm -f $(TARGET)
