file1 = open('./words.txt', 'r')
Lines = file1.readlines()
lines = ""
for line in Lines:
  line = '"' + line[0:5:1] + '",'
  lines += line
print(lines)
file1.close()

file1 = open('./words.txt', 'w')
file1.writelines(lines)
file1.close()