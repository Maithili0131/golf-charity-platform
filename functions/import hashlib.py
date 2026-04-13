import hashlib
import random
def a3_algorithm(Ki, RAND):
    combined = f"{Ki}{RAND}".encode()
    sres = hashlib.sha1(combined).hexdigest()[:8]
    return sres
def a8_algorithm(Ki, RAND):
    combined = f"{Ki}{RAND}".encode()
    Kc = hashlib.md5(combined).hexdigest()[:16]
    return Kc
def generate_keystream(length, Kc):
    seed = int(Kc, 16)
    random.seed(seed)
    return [random.randint(0, 255) for _ in range(length)]
def a5_algorithm(key_stream, plaintext):
    ciphertext = ''.join(chr(ord(c) ^ k) for c, k in zip(plaintext, key_stream))
    return ciphertext
if __name__ == "__main__":
    print("==== GSM Security Simulation: A3, A8, A5 ====\n")
    Ki = input("Enter your SIM key (Ki): ")
    RAND = input("Enter the random challenge (RAND): ")
    plaintext = input("Enter the message to encrypt: ")
    print("\n---- Step 1: Authentication (A3) ----")
    sres = a3_algorithm(Ki, RAND)
    print(f"SRES (Signed Response) generated: {sres}")
    print("\n---- Step 2: Session Key Generation (A8) ----")
    Kc = a8_algorithm(Ki, RAND)
    print(f"Session key (Kc) generated: {Kc}")
    print("\n---- Step 3: Encryption (A5) ----")
    keystream = generate_keystream(len(plaintext), Kc)
    ciphertext = a5_algorithm(keystream, plaintext)
    print(f"Plaintext: {plaintext}")
    print(f"Ciphertext (bytes representation): {list(ciphertext.encode('utf-8'))}")
    print("\n---- Step 4: Decryption using A5 ----")
    decrypted = a5_algorithm(keystream, ciphertext)
    print(f"Decrypted message: {decrypted}")
    print("\n==== Summary ====")
    print(f"Random Challenge (RAND): {RAND}")
    print(f"SIM Key (Ki): {Ki}")
    print(f"SRES (A3): {sres}")
    print(f"Session Key (Kc - A8): {Kc}")
    print(f"Original Message: {plaintext}")
    print(f"Encrypted Message: {list(ciphertext.encode('utf-8'))}")
    print(f"Decrypted Message: {decrypted}")
