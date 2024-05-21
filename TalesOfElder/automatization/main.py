with open('text.txt', 'r') as file:
    with open('output.json', 'w') as output:
        output.write("{\n\t")
        output.write('"header": "Tales of Elder tree data pack",\n\t')
        for i in range(1, 17):
            output.write(f'"{i}": "')
            first_time = True
            while True:
                line = file.readline()[:-1]
                if '\u0009' in line:
                    line = line.replace('\u0009', '   ')
                if not line: break
                if "-next-" in line: break
                if not first_time:
                    output.write("<br>")
                output.write(line)
                first_time = False
            if i == 16:
                output.write('"\n}')
            else:
                output.write('",\n\t')
