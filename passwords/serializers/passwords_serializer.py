from rest_framework import serializers

from passwords.models import PasswordEntry


class PasswordEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordEntry
        fields = "__all__"
        extra_kwargs = {"user": {"required": False, "allow_null": True}}

    def create(self, validated_data):
        password = PasswordEntry(**validated_data)
        password.save()
        return password
